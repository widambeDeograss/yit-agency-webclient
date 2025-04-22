export const displaySessionExpiredModal = () => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add(
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-50',
      'z-40'
    );
    document.body.appendChild(overlay);
  
    const modal = document.createElement('div');
    modal.classList.add(
      'fixed',
      'top-1/2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'p-5',
      'shadow-lg',
      'z-50',
      'text-center',
      'rounded-lg',
      'min-w-[250px]',
      'dark:bg-gray-800',
      'bg-white',
      'dark:text-white',
      'text-black'
    );
  
    modal.innerHTML = `
      <h2 class="mb-2">Session Expired</h2>
      <p class="mb-4">Your session has expired. Please log in again to continue.</p>
      <button id="modal-close-btn" class="px-4 py-2 text-white rounded bg-primary">
        OK
      </button>
    `;
  
    document.body.appendChild(modal);
  
    if (modal.style.display === 'none') {
      modal.style.display = 'block';
    }
  
    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
      modal.remove();
      overlay.remove(); // Remove overlay when closing modal
      window.location.href = '/sign-in';
    });
  };