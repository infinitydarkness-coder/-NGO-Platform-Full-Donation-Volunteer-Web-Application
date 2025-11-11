// Form handling for volunteer registration
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const formData = {
                name: this.querySelector('[name="name"]').value,
                email: this.querySelector('[name="email"]').value,
                phone: this.querySelector('[name="phone"]').value,
                skills: this.querySelector('[name="skills"]').value,
                availability: this.querySelector('[name="availability"]').value
            };

            const response = await fetch('/volunteer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);
            if (response.ok) {
                this.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form. Please try again.');
        }
    });
}

// Form handling for donation/payment
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const formData = {
                email: this.querySelector('[name="email"]').value,
                amount: parseFloat(this.querySelector('[name="amount"]').value),
                payment_id: 'PAY_' + Math.random().toString(36).substr(2, 9)
            };

            const response = await fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);
            if (response.ok) {
                this.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error processing payment. Please try again.');
        }
    });
}
