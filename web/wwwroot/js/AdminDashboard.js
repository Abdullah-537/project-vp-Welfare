// AdminDashboard.js - Part 1: Core Functions and Animations
// MERGE INSTRUCTION: Place this at the TOP of your JavaScript file
(function () {
    'use strict';

    function qs(sel) {
        return document.querySelector(sel);
    }

    function qsa(sel) {
        return Array.from(document.querySelectorAll(sel));
    }

    // ==================== TAB NAVIGATION ====================
    window.showSection = function (evt, sectionName) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }
        if (evt && evt.currentTarget) {
            qsa('.nav-link').forEach(n => n.classList.remove('active'));
            evt.currentTarget.classList.add('active');
        }
        qsa('.content-card').forEach(c => c.classList.remove('active'));
        const target = document.getElementById(sectionName);
        if (target) target.classList.add('active');
    };

    // ==================== NGO REQUEST FIELD TOGGLING ====================
    window.toggleNGOFields = function (requestType) {
        const financialField = document.getElementById('financialField');
        const foodField = document.getElementById('foodField');
        const clothesField = document.getElementById('clothesField');
        const shelterField = document.getElementById('shelterField');

        // Hide all fields
        if (financialField) financialField.classList.add('hidden');
        if (foodField) foodField.classList.add('hidden');
        if (clothesField) clothesField.classList.add('hidden');
        if (shelterField) shelterField.classList.add('hidden');

        // Clear required attributes
        const financialInput = document.getElementById('RequestedAmountInput');
        const foodInput = document.getElementById('FoodQuantityInput');
        const maleClothesInput = document.getElementById('MaleClothesQtyInput');
        const femaleClothesInput = document.getElementById('FemaleClothesQtyInput');
        const kidsClothesInput = document.getElementById('KidsClothesQtyInput');
        const shelterInput = document.getElementById('ShelterBedsInput');

        if (financialInput) financialInput.removeAttribute('required');
        if (foodInput) foodInput.removeAttribute('required');
        if (maleClothesInput) maleClothesInput.removeAttribute('required');
        if (femaleClothesInput) femaleClothesInput.removeAttribute('required');
        if (kidsClothesInput) kidsClothesInput.removeAttribute('required');
        if (shelterInput) shelterInput.removeAttribute('required');

        // Show relevant field based on type
        switch (requestType) {
            case 'Financial':
                if (financialField) {
                    financialField.classList.remove('hidden');
                    if (financialInput) financialInput.setAttribute('required', 'required');
                }
                break;
            case 'Food':
                if (foodField) {
                    foodField.classList.remove('hidden');
                    if (foodInput) foodInput.setAttribute('required', 'required');
                }
                break;
            case 'Clothes':
                if (clothesField) {
                    clothesField.classList.remove('hidden');
                }
                break;
            case 'Shelter':
                if (shelterField) {
                    shelterField.classList.remove('hidden');
                    if (shelterInput) shelterInput.setAttribute('required', 'required');
                }
                break;
        }
    };

    // ==================== SUCCESS ANIMATIONS ====================
    function createConfetti(colors = null) {
        const defaultColors = ['#667eea', '#764ba2', '#98a0f8', '#8a6ab8', '#7f8ff1', '#28a745'];
        const confettiColors = colors || defaultColors;

        for (let i = 0; i < 50; i++) {
            const c = document.createElement('div');
            c.style.position = 'fixed';
            c.style.left = (Math.random() * 100) + '%';
            c.style.top = '-10px';
            c.style.width = '8px';
            c.style.height = '12px';
            c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            c.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            c.style.opacity = '0.95';
            c.style.zIndex = '99999';
            c.style.borderRadius = '2px';
            c.style.pointerEvents = 'none';

            const duration = 2 + Math.random() * 2;
            const delay = Math.random() * 0.5;
            c.style.animation = `fall ${duration}s linear ${delay}s forwards`;

            document.body.appendChild(c);

            setTimeout(() => c.remove(), (duration + delay) * 1000 + 100);
        }
    }

    window.showSuccessAnimation = function (type) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = '99998';
        overlay.style.backdropFilter = 'blur(4px)';
        document.body.appendChild(overlay);

        const box = document.createElement('div');
        box.style.position = 'fixed';
        box.style.left = '50%';
        box.style.top = '50%';
        box.style.transform = 'translate(-50%,-50%) scale(0.8)';
        box.style.zIndex = '99999';
        box.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        box.style.padding = '50px';
        box.style.borderRadius = '20px';
        box.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        box.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.5)';
        box.style.textAlign = 'center';
        box.style.minWidth = '350px';
        box.style.animation = 'popIn 0.3s ease-out forwards';

        const emoji = type === 'food' ? '🍲' : type === 'clothes' ? '👕' : type === 'loan' ? '💰' : '🏠';
        const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

        box.innerHTML = `
            <div style="font-size: 64px; margin-bottom: 20px; animation: bounce 0.6s ease-in-out;">${emoji}</div>
            <h2 style="color: white; margin: 0 0 15px 0; font-size: 28px; font-weight: 600;">Request Fulfilled!</h2>
            <p style="color: rgba(255,255,255,0.95); font-size: 16px; line-height: 1.6; margin: 0;">The ${typeCapitalized} request has been successfully fulfilled. Resources have been allocated! ✅</p>
        `;

        document.body.appendChild(box);

        setTimeout(() => createConfetti(), 100);

        setTimeout(() => {
            box.style.animation = 'popOut 0.3s ease-in forwards';
            setTimeout(() => {
                box.remove();
                overlay.remove();
            }, 300);
        }, 3000);
    };

    // Generic action animation with color theming
    window.showActionSuccessAnimation = function (emoji, title, message, actionType = 'success') {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = '99998';
        overlay.style.backdropFilter = 'blur(4px)';
        document.body.appendChild(overlay);

        // Color schemes based on action type
        let gradient, shadowColor, confettiColors;
        switch (actionType) {
            case 'danger':
            case 'reject':
            case 'cancel':
            case 'deactivate':
            case 'unverify':
                gradient = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                shadowColor = 'rgba(220, 53, 69, 0.5)';
                confettiColors = ['#dc3545', '#c82333', '#ff6b6b', '#ee5a6f', '#bd2130'];
                break;
            case 'warning':
                gradient = 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)';
                shadowColor = 'rgba(255, 193, 7, 0.5)';
                confettiColors = ['#ffc107', '#ff9800', '#ffca28', '#ffa726', '#f57c00'];
                break;
            case 'success':
            case 'approve':
            case 'verify':
            case 'activate':
            default:
                gradient = 'linear-gradient(135deg, #28a745 0%, #218838 100%)';
                shadowColor = 'rgba(40, 167, 69, 0.5)';
                confettiColors = ['#28a745', '#218838', '#48c774', '#5cb85c', '#1e7e34'];
                break;
        }

        const box = document.createElement('div');
        box.style.position = 'fixed';
        box.style.left = '50%';
        box.style.top = '50%';
        box.style.transform = 'translate(-50%,-50%) scale(0.8)';
        box.style.zIndex = '99999';
        box.style.background = gradient;
        box.style.padding = '50px';
        box.style.borderRadius = '20px';
        box.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        box.style.boxShadow = `0 20px 60px ${shadowColor}`;
        box.style.textAlign = 'center';
        box.style.minWidth = '350px';
        box.style.animation = 'popIn 0.3s ease-out forwards';

        box.innerHTML = `
            <div style="font-size: 64px; margin-bottom: 20px; animation: bounce 0.6s ease-in-out;">${emoji}</div>
            <h2 style="color: white; margin: 0 0 15px 0; font-size: 28px; font-weight: 600;">${title}</h2>
            <p style="color: rgba(255,255,255,0.95); font-size: 16px; line-height: 1.6; margin: 0;">${message}</p>
        `;

        document.body.appendChild(box);

        setTimeout(() => createConfetti(confettiColors), 100);

        setTimeout(() => {
            box.style.animation = 'popOut 0.3s ease-in forwards';
            setTimeout(() => {
                box.remove();
                overlay.remove();
            }, 300);
        }, 2500);
    };

    // ==================== APPROVE REQUEST ====================
    window.approveRequest = function (requestId) {
        console.log('📝 Approve Request called with ID:', requestId);
        const form = document.getElementById('approveForm');
        console.log('Form found:', form);

        showConfirmModal(
            '✓ Approve Request',
            'Are you sure you want to approve this request? This will move the request to approved status and allow fulfillment.',
            function () {
                console.log('✅ Confirmed - Submitting form');
                const input = document.getElementById('approveRequestId');
                console.log('Input found:', input);
                input.value = requestId;
                console.log('Set input value to:', requestId);

                showActionSuccessAnimation('✅', 'Request Approved!', 'The request has been approved successfully! You can now fulfill it.', 'approve');

                setTimeout(() => {
                    form.submit();
                }, 2500);
            }
        );
    };

    // ==================== REJECT REQUEST ====================
    window.rejectRequest = function (requestId) {
        console.log('❌ Reject Request called with ID:', requestId);

        showInputModal(
            '✗ Reject Request',
            'Please provide a reason for rejecting this request:',
            'Enter rejection reason...',
            function (reason) {
                console.log('Rejection reason:', reason);
                if (reason && reason.trim() !== '') {
                    console.log('✅ Valid reason - Submitting form');
                    document.getElementById('rejectRequestId').value = requestId;
                    document.getElementById('rejectReason').value = reason;

                    showActionSuccessAnimation('❌', 'Request Rejected', 'The request has been rejected with your reason.', 'reject');

                    setTimeout(() => {
                        document.getElementById('rejectForm').submit();
                    }, 2500);
                } else {
                    console.log('⚠️ Invalid reason');
                    showAlertModal('⚠️ Required', 'Please provide a rejection reason.');
                }
            }
        );
    };

    // ==================== FULFILL REQUEST ====================
    window.fulfillRequest = function (requestId, canFulfill) {
        console.log('🎁 Fulfill Request called with ID:', requestId, 'Can Fulfill:', canFulfill);

        if (!canFulfill) {
            console.log('⚠️ Cannot fulfill - insufficient resources');
            showAlertModal(
                '⚠️ Insufficient Resources',
                'Cannot fulfill this request due to insufficient resources. Please check inventory levels and try again.'
            );
            return;
        }

        showConfirmModal(
            '🎁 Fulfill Request',
            'Are you sure you want to fulfill this request? ' +
            '✓ This will deduct resources from inventory ' +
            '✓ The receiver will be notified ' +
            '✓ This action cannot be undone',
            function () {
                console.log('✅ Confirmed - Submitting form');
                document.getElementById('fulfillRequestId').value = requestId;
                document.getElementById('fulfillForm').submit();
                console.log('Form submitted');
            }
        );
    };

    // ==================== USER MANAGEMENT ====================
    window.toggleUserStatus = function (userId, isActive) {
        const action = isActive ? 'deactivate' : 'activate';
        const actionText = isActive ? 'Deactivate' : 'Activate';

        showConfirmModal(
            `🔄 ${actionText} User`,
            `Are you sure you want to ${action} this user's account?`,
            function () {
                if (isActive) {
                    // Deactivating user - RED
                    showActionSuccessAnimation('🚫', 'User Deactivated!', 'The user account has been deactivated successfully!', 'deactivate');
                } else {
                    // Activating user - GREEN
                    showActionSuccessAnimation('✅', 'User Activated!', 'The user account has been activated successfully!', 'activate');
                }

                setTimeout(() => {
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '/Admin/ToggleUserStatus';

                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'userId';
                    input.value = userId;
                    form.appendChild(input);

                    document.body.appendChild(form);
                    form.submit();
                }, 2500);
            }
        );
    };

    // ==================== NGO MANAGEMENT ====================
    window.toggleNGOStatus = function (ngoId, isActive) {
        const action = isActive ? 'deactivate' : 'activate';
        const actionText = isActive ? 'Deactivate' : 'Activate';

        showConfirmModal(
            `🔄 ${actionText} NGO`,
            `Are you sure you want to ${action} this NGO's account?`,
            function () {
                if (isActive) {
                    // Deactivating NGO - RED
                    showActionSuccessAnimation('🚫', 'NGO Deactivated!', 'The NGO account has been deactivated successfully!', 'deactivate');
                } else {
                    // Activating NGO - GREEN
                    showActionSuccessAnimation('✅', 'NGO Activated!', 'The NGO account has been activated successfully!', 'activate');
                }

                setTimeout(() => {
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '/Admin/ToggleNGOStatus';

                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'ngoId';
                    input.value = ngoId;
                    form.appendChild(input);

                    document.body.appendChild(form);
                    form.submit();
                }, 2500);
            }
        );
    };

    window.verifyNGO = function (ngoId, isVerified) {
        const action = isVerified ? 'unverify' : 'verify';
        const actionText = isVerified ? 'Unverify' : 'Verify';

        showConfirmModal(
            `✓ ${actionText} NGO`,
            `Are you sure you want to ${action} this NGO?`,
            function () {
                if (isVerified) {
                    // Unverifying NGO - RED
                    showActionSuccessAnimation('⚠️', 'NGO Unverified!', 'The NGO verification has been removed.', 'unverify');
                } else {
                    // Verifying NGO - GREEN
                    showActionSuccessAnimation('✅', 'NGO Verified!', 'The NGO has been successfully verified!', 'verify');
                }

                setTimeout(() => {
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '/Admin/VerifyNGO';

                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'ngoId';
                    input.value = ngoId;
                    form.appendChild(input);

                    document.body.appendChild(form);
                    form.submit();
                }, 2500);
            }
        );
    };

    // ==================== NGO REQUEST MANAGEMENT ====================
    window.cancelNGORequest = function (requestId) {
        showConfirmModal(
            '❌ Cancel NGO Request',
            'Are you sure you want to cancel this request? This action cannot be undone.',
            function () {
                showActionSuccessAnimation('🚫', 'Request Cancelled!', 'The NGO request has been cancelled successfully!', 'cancel');

                setTimeout(() => {
                    const form = document.getElementById('cancelForm');
                    if (form) {
                        document.getElementById('cancelReqId').value = requestId;
                        form.submit();
                    }
                }, 2500);
            }
        );
    };

    // Store functions for Part 2
    window._adminDashboard = {
        qs: qs,
        qsa: qsa,
        createConfetti: createConfetti
    };

// END OF PART 1 - Continue with Part 2 below
    // AdminDashboard.js - Part 2: Modals, Tables, and Initialization
    // MERGE INSTRUCTION: Place this BELOW Part 1 in your JavaScript file

    // ==================== MODAL HANDLING ====================
    function initModals() {
        const modals = window._adminDashboard.qsa('[id$="Modal"]');
        modals.forEach(modal => {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // ==================== OPEN/CLOSE MODAL FUNCTIONS ====================
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // ==================== CUSTOM MODAL SYSTEM ====================
    window.showAlertModal = function (title, message) {
        const overlay = createModalOverlay();
        const modal = createModalBox(title, message);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'modal-btn-container';

        const okBtn = document.createElement('button');
        okBtn.className = 'modal-btn modal-btn-primary';
        okBtn.textContent = 'OK';
        okBtn.onclick = function () {
            closeModalBox(overlay, modal);
        };

        btnContainer.appendChild(okBtn);
        modal.appendChild(btnContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    };

    window.showConfirmModal = function (title, message, onConfirm) {
        const overlay = createModalOverlay();
        const modal = createModalBox(title, message);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'modal-btn-container';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'modal-btn modal-btn-secondary';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = function () {
            closeModalBox(overlay, modal);
        };

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'modal-btn modal-btn-primary';
        confirmBtn.textContent = 'Confirm';
        confirmBtn.onclick = function () {
            closeModalBox(overlay, modal);
            if (onConfirm) onConfirm();
        };

        btnContainer.appendChild(cancelBtn);
        btnContainer.appendChild(confirmBtn);
        modal.appendChild(btnContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    };

    window.showInputModal = function (title, message, placeholder, onSubmit) {
        const overlay = createModalOverlay();
        const modal = createModalBox(title, message);

        const inputContainer = document.createElement('div');
        inputContainer.style.marginTop = '20px';

        const input = document.createElement('textarea');
        input.className = 'modal-input';
        input.placeholder = placeholder;
        input.rows = 4;
        inputContainer.appendChild(input);
        modal.appendChild(inputContainer);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'modal-btn-container';
        btnContainer.style.marginTop = '20px';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'modal-btn modal-btn-secondary';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = function () {
            closeModalBox(overlay, modal);
        };

        const submitBtn = document.createElement('button');
        submitBtn.className = 'modal-btn modal-btn-primary';
        submitBtn.textContent = 'Submit';
        submitBtn.onclick = function () {
            const value = input.value.trim();
            closeModalBox(overlay, modal);
            if (onSubmit) onSubmit(value);
        };

        btnContainer.appendChild(cancelBtn);
        btnContainer.appendChild(submitBtn);
        modal.appendChild(btnContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
            input.focus();
        }, 10);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitBtn.click();
            }
        });
    };

    function createModalOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        overlay.onclick = function () { };
        return overlay;
    }

    function createModalBox(title, message) {
        const modal = document.createElement('div');
        modal.className = 'custom-modal-box';

        const titleEl = document.createElement('h3');
        titleEl.className = 'modal-title';
        titleEl.innerHTML = title;

        const messageEl = document.createElement('p');
        messageEl.className = 'modal-message';
        messageEl.innerHTML = message;

        modal.appendChild(titleEl);
        modal.appendChild(messageEl);

        return modal;
    }

    function closeModalBox(overlay, modal) {
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            overlay.remove();
            modal.remove();
        }, 300);
    }

    // ==================== TABLE ENHANCEMENTS ====================
    function enhanceTables() {
        const tables = window._adminDashboard.qsa('.history-table tbody tr');
        tables.forEach((row, index) => {
            row.style.animationDelay = `${index * 0.05}s`;
            row.style.animation = 'fadeInRow 0.3s ease-out forwards';
        });
    }

    // ==================== QUICK ACTIONS ON HOME TAB ====================
    function initQuickActions() {
        const qs = window._adminDashboard.qs;
        const qsa = window._adminDashboard.qsa;

        const actionCards = qsa('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', function () {
                let sectionName = '';
                if (this.classList.contains('card-requests')) {
                    sectionName = 'requests';
                } else if (this.classList.contains('card-users')) {
                    sectionName = 'users';
                } else if (this.classList.contains('card-ngos')) {
                    sectionName = 'ngos';
                } else if (this.classList.contains('card-admins')) {
                    sectionName = 'admins';
                } else if (this.classList.contains('card-transactions')) {
                    sectionName = 'transactions';
                } else if (this.classList.contains('card-donations')) {
                    sectionName = 'donations';
                } else if (this.classList.contains('card-ngo-requests')) {
                    sectionName = 'ngo-requests';
                }

                if (sectionName) {
                    qsa('.nav-link').forEach(n => n.classList.remove('active'));
                    const navLink = qs(`.nav-link[onclick*="${sectionName}"]`);
                    if (navLink) navLink.classList.add('active');

                    qsa('.content-card').forEach(c => c.classList.remove('active'));
                    const target = document.getElementById(sectionName);
                    if (target) target.classList.add('active');
                }
            });
        });
    }

    // ==================== SEARCH FUNCTIONALITY ====================
    window.searchTable = function (inputId, tableId) {
        const input = document.getElementById(inputId);
        const table = document.getElementById(tableId);
        if (!input || !table) return;

        const filter = input.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            let found = false;

            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;
                if (cellText.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }

            row.style.display = found ? '' : 'none';
        }
    };

    // ==================== STATISTICS UPDATE ====================
    function updateStatistics() {
        const statNumbers = window._adminDashboard.qsa('.stat-number');
        statNumbers.forEach(stat => {
            stat.style.animation = 'pulse 2s ease-in-out infinite';
        });
    }

    // ==================== FORM SUBMISSION ANIMATIONS ====================
    document.addEventListener('submit', function (e) {
        const form = e.target;

        // Add NGO Form
        if (form.action && form.action.includes('/Admin/AddNGO')) {
            e.preventDefault();
            window._adminDashboard.saveCurrentTab();
            showActionSuccessAnimation('🏢', 'NGO Added!', 'The new NGO has been added and verified successfully!', 'activate');
            setTimeout(() => form.submit(), 2500);
        }
        // Add Admin Form
        else if (form.action && form.action.includes('/Admin/AddAdmin')) {
            e.preventDefault();
            window._adminDashboard.saveCurrentTab();
            showActionSuccessAnimation('👨‍💼', 'Admin Added!', 'The new administrator has been added successfully!', 'activate');
            setTimeout(() => form.submit(), 2500);
        }
        // Create NGO Request Form
        else if (form.action && form.action.includes('/Admin/CreateNGORequest')) {
            e.preventDefault();
            window._adminDashboard.saveCurrentTab();
            showActionSuccessAnimation('📤', 'Request Sent!', 'Your support request has been sent to the NGO successfully!', 'success');
            setTimeout(() => form.submit(), 2500);
        }
    });

    // ==================== ANIMATIONS ====================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes popIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @keyframes popOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        @keyframes fadeInRow {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }

        .modal-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid rgba(102,126,234,0.2);
            border-radius: 12px;
            font-size: 15px;
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s ease;
            background: white;
            resize: vertical;
        }

        .modal-input:focus {
            outline: none;
            border-color: var(--accent-start, #667eea);
            box-shadow: 0 5px 20px rgba(102,126,234,0.2);
        }
    `;
    document.head.appendChild(style);

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', function () {
        console.log('🚀 Admin Dashboard JS Loaded');
        console.log('✓ Checking forms...');
        console.log('Approve Form:', document.getElementById('approveForm'));
        console.log('Reject Form:', document.getElementById('rejectForm'));
        console.log('Fulfill Form:', document.getElementById('fulfillForm'));

        initModals();
        enhanceTables();
        initQuickActions();
        updateStatistics();

        // Restore the active tab after page reload
        window._adminDashboard.restoreActiveTab();

        const justFulfilled = document.querySelector('[data-just-fulfilled]');
        if (justFulfilled) {
            const type = justFulfilled.getAttribute('data-just-fulfilled');
            setTimeout(() => showSuccessAnimation(type), 300);
        }

        const alerts = window._adminDashboard.qsa('.alert');
        alerts.forEach(alert => {
            setTimeout(() => {
                alert.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => alert.remove(), 300);
            }, 5000);
        });

        console.log('✅ Admin Dashboard initialized successfully');
    });

})();
// END OF PART 2