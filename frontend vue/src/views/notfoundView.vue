<template>
    <div class="error-page">
        <div class="content select-none">
            <h1 class="error-code">
                <span class="digit">4</span>
                <span class="digit">0</span>
                <span class="digit">4</span>
            </h1>
            <p class="error-message">Oops! Page not found</p>
            <p class="error-description">
                The page you are looking for might have been removed, had its name changed, or is temporarily
                unavailable.
            </p>
            <button @click="goHome" class="home-button">
                Go Home
            </button>
        </div>
        <div class="astronaut">
            <img src="@/assets/logo.svg" alt="Lost astronaut" class="astronaut-image" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goHome() {
            console.log('Navigating to home page');
            this.$router.push({ name: 'home' });
        },

        animateAstronaut() {
            const astronaut = document.querySelector('.astronaut');
            let position = 0;
            let direction = 1;

            setInterval(() => {
                position += direction * 0.5;
                if (position > 20 || position < -20) {
                    direction *= -1;
                }
                astronaut.style.transform = `translateY(${position}px)`;
            }, 50);
        }
    },
    mounted() {
        this.animateAstronaut();
    },
}
</script>

<style scoped>
.error-page {
    @apply min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden;
}

.content {
    @apply text-center z-10;
}

.error-code {
    @apply text-9xl !font-bold text-white mb-8;
}

.digit {
    @apply inline-block;
    animation: bounce 0.9s ease infinite alternate;
}

.digit:nth-child(2) {
    animation-delay: 0.2s;
}

.digit:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

.error-message {
    @apply text-4xl font-semibold text-white mb-4;
}

.error-description {
    @apply text-xl text-gray-300 mb-8 max-w-md mx-auto;
}

.home-button {
    @apply bg-white text-gray-900 font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300;
}

.astronaut {
    @apply absolute z-0 opacity-50;
    animation: float 6s ease-in-out infinite;
}

.astronaut-image {
    @apply w-64 h-64;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}
</style>
