using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using web.Data;
using web.Models;

namespace web.Services
{
    public class MonthlyAllocationService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public MonthlyAllocationService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await CheckAndAllocateMonthly();
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
        }

        private async Task CheckAndAllocateMonthly()
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<WelfareDb>();

            var fund = await context.WelfareFunds.FindAsync(1);
            if (fund == null) return;

            if (DateTime.Now.Month != fund.LastMonthlyReset.Month ||
                DateTime.Now.Year != fund.LastMonthlyReset.Year)
            {
                var allocationLog = new MonthlyAllocationLog
                {
                    AllocationDate = DateTime.Now,
                    BalanceBefore = fund.CurrentBalance,
                    FoodInventoryBefore = fund.FoodInventoryUnits,
                    MaleClothesInventoryBefore = fund.MaleClothesInventory,
                    FemaleClothesInventoryBefore = fund.FemaleClothesInventory,
                    KidsClothesInventoryBefore = fund.KidsClothesInventory,
                    MoneyAllocated = fund.MonthlyAllocation,
                    FoodAllocated = fund.MonthlyFoodAllocation,
                    FoodUnit = fund.FoodUnit,
                    MaleClothesAllocated = fund.MonthlyMaleClothesAllocation,
                    FemaleClothesAllocated = fund.MonthlyFemaleClothesAllocation,
                    KidsClothesAllocated = fund.MonthlyKidsClothesAllocation
                };

                fund.CurrentBalance += fund.MonthlyAllocation;
                fund.FoodInventoryUnits += fund.MonthlyFoodAllocation;
                fund.MaleClothesInventory += fund.MonthlyMaleClothesAllocation;
                fund.FemaleClothesInventory += fund.MonthlyFemaleClothesAllocation;
                fund.KidsClothesInventory += fund.MonthlyKidsClothesAllocation;
                fund.LastMonthlyReset = DateTime.Now;
                fund.LastUpdated = DateTime.Now;

                allocationLog.BalanceAfter = fund.CurrentBalance;
                allocationLog.FoodInventoryAfter = fund.FoodInventoryUnits;
                allocationLog.MaleClothesInventoryAfter = fund.MaleClothesInventory;
                allocationLog.FemaleClothesInventoryAfter = fund.FemaleClothesInventory;
                allocationLog.KidsClothesInventoryAfter = fund.KidsClothesInventory;
                allocationLog.Notes = "Automatic monthly allocation";

                context.MonthlyAllocationLogs.Add(allocationLog);
                await context.SaveChangesAsync();
            }
        }
    }
}