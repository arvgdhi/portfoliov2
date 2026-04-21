document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.getElementById('custom-cursor');
    
    // Store mouse coordinates
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Smooth cursor follow parameters (for the tiny square)
    let isHovering = false;
    let targetElement = null;

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if(!isHovering) {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }
    });

    // Select all clickable or interactable items
    const interactables = document.querySelectorAll('a, button, .skill-tag, .project-card, .milestone-card, .research-card');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            isHovering = true;
            targetElement = el;
            
            // Add styling class (camera brackets)
            cursor.classList.add('target-mode');
            
            // Getting bounds to size the target box
            const rect = el.getBoundingClientRect();
            
            // Add padding so the brackets sit slightly outside the element
            const padding = 12;
            
            // Set position and size to physically frame the element
            cursor.style.width = `${rect.width + padding * 2}px`;
            cursor.style.height = `${rect.height + padding * 2}px`;
            cursor.style.left = `${rect.left - padding}px`;
            cursor.style.top = `${rect.top - padding}px`;
        });

        // Mouseleave
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            targetElement = null;
            
            // Remove target styling
            cursor.classList.remove('target-mode');
            
            // Reset to default small square dimension
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            
            // Snap back accurately to the mouse
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });
    });

    // Handle scroll so the brackets stick correctly while hovering and scrolling
    document.addEventListener('scroll', () => {
        if (isHovering && targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const padding = 12;
            cursor.style.left = `${rect.left - padding}px`;
            cursor.style.top = `${rect.top - padding}px`;
        }
    });

    // Scroll Observer for revealing elements smoothly
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.auto-hide').forEach(el => observer.observe(el));
});
