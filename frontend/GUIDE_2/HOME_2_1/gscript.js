document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        const isOpen = answer.style.display === "block";
        
        // Close all open answers
        document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");

        // Toggle the clicked answer
        answer.style.display = isOpen ? "none" : "block";
    });
});
