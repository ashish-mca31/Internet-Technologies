document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        dob: document.getElementById('dob'),
        phone: document.getElementById('phone')
    };

    const errors = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passError'),
        dob: document.getElementById('dobError'),
        phone: document.getElementById('phoneError')
    };

    fields.password.addEventListener('input', () => {
        const val = fields.password.value;
        const strengthText = document.getElementById('strengthText');
        let score = 0;

        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[@$!%*?&]/.test(val)) score++;

        const levels = ["None", "Weak", "Fair", "Good", "Strong"];
        const classes = ["", "weak", "fair", "good", "strong"];
        
        const index = Math.min(score, 4);
        
        strengthText.innerText = levels[index];
        strengthText.className = classes[index];
    });

    const validate = {
        name: (val) => /^[A-Za-z\s]+$/.test(val) ? "" : "Alphabets only, please.",
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Invalid email format.",
        password: (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(val) 
            ? "" : "Must be 8+ chars with Upper, Lower, Num, & Special.",
        phone: (val) => /^\d{10}$/.test(val) ? "" : "Must be exactly 10 digits.",
        dob: (val) => {
            if (!val) return "Date of birth is required.";
            const birth = new Date(val);
            const now = new Date();
            let age = now.getFullYear() - birth.getFullYear();
            const m = now.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
            return age >= 18 ? "" : "You must be at least 18 years old.";
        }
    };

    Object.keys(fields).forEach(key => {
        fields[key].addEventListener('input', () => {
            const errorMsg = validate[key](fields[key].value);
            errors[key].textContent = errorMsg;
            fields[key].classList.toggle('invalid', errorMsg !== "");
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        Object.keys(fields).forEach(key => {
            const errorMsg = validate[key](fields[key].value);
            if (errorMsg) {
                errors[key].textContent = errorMsg;
                fields[key].classList.add('invalid');
                isValid = false;
            }
        });

        if (isValid) {
            alert("Registration Successful!");
            form.reset();
            document.getElementById('strengthText').innerText = "None";
        }
    });
});