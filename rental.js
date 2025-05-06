document.addEventListener('DOMContentLoaded', function() {
    const rideOptions = document.querySelectorAll('.ride-option');
    const calculateBtn = document.getElementById('calculateBtn');
    const rentNowBtn = document.getElementById('rentNowBtn');
    const confirmRentalBtn = document.getElementById('confirmRentalBtn');
    const resultSection = document.getElementById('result');
    const checkoutForm = document.getElementById('checkoutForm');
    
    let selectedRide = {
      type: 'cycle',
      rate: 20,
      displayName: 'Cycle'
    };
    
    rideOptions.forEach(option => {
      option.addEventListener('click', function() {
        rideOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        selectedRide = {
          type: this.dataset.ride,
          rate: parseInt(this.dataset.rate),
          displayName: this.querySelector('h3').textContent
        };
        if (resultSection.style.display === 'block') {
          calculateCost();
        }
      });
    });
    
    calculateBtn.addEventListener('click', calculateCost);
    
    function calculateCost() {
      const hours = parseInt(document.getElementById('hours').value) || 1;
      const totalCost = selectedRide.rate * hours;
      document.getElementById('rideTypeText').textContent = 
        `${selectedRide.displayName} for ${hours} hour${hours !== 1 ? 's' : ''}`;
      document.getElementById('totalCost').textContent = `₹${totalCost}`;
      resultSection.style.display = 'block';
      resultSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    rentNowBtn.addEventListener('click', function() {
      checkoutForm.style.display = 'block';
      checkoutForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    confirmRentalBtn.addEventListener('click', confirmRental);
    
    function confirmRental() {
      const name = document.getElementById('fullName').value.trim();
      const id = document.getElementById('studentId').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      
      if (!validateForm(name, id, email, phone)) {
        return;
      }
      
      console.log('Rental confirmed:', {
        rideType: selectedRide.type,
        hours: parseInt(document.getElementById('hours').value) || 1,
        customer: { name, id, email, phone }
      });
      
      alert(`Your rental has been confirmed!\nThank you, ${name}, for choosing Campus Ride.`);
      resetRentalForm();
    }
    
    function validateForm(name, id, email, phone) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,}$/;
      
      if (!name || !id || !email || !phone) {
        alert('Please fill in all fields.');
        return false;
      }
      
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
      
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
      }
      
      return true;
    }
    
    function resetRentalForm() {
      document.getElementById('hours').value = '1';
      document.getElementById('fullName').value = '';
      document.getElementById('studentId').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      resultSection.style.display = 'none';
      checkoutForm.style.display = 'none';
      rideOptions.forEach(opt => opt.classList.remove('active'));
      document.querySelector('.ride-option[data-ride="cycle"]').classList.add('active');
      selectedRide = {
        type: 'cycle',
        rate: 20,
        displayName: 'Cycle'
      };
    }
});