<template>
    <div>
        Count: {{ testingStore.count }}
    </div>
    <div>
        <!-- this will process the count value everytime it's updated -->
        Double Count: {{ testingStore.doubleCount }}
    </div>
    <x-button @clicked="testingStore.increment()">
        increment
    </x-button>
    <span v-if="testingStore.count !== 0">
        <x-button @clicked="testingStore.decrement()">
            decrement
        </x-button>
        <!-- resetting count will not update the rendering if value already 0 -->
        <x-button @clicked="testingStore.reset()">
            reset
        </x-button>
    </span>
</template>

<script>
/**
 * Counter component
 * @module Counter
 */
export default {
    name: 'counter',

    /**
     * Component data
     * @returns {Object} The component's data object
     */
    data() {
        return {
            testingStore: useTestingStore()
        };
    },

    /**
     * Called immediately when the instance is initialized and props are resolved.
     *
     * Then the props will be defined as reactive properties and the state such as data() or computed will be set up.
     * Note that the setup() hook of Composition API is called before any Options API hooks, even beforeCreate().
     *
     * @description
     * Useful for setting up initial state or performing tasks that need to happen before the component is fully created.
     */
    beforeCreate() {
        console.log('this should be undefined', this.testingStore);
        console.log('From counter.vue | beforeCreate');
    },

    /**
     * Called after the instance has finished processing all state-related options.
     *
     * When this hook is called, the following have been set up: reactive data,
     * computed properties, methods, and watchers. However, the mounting phase has not been started,
     * and the $el property will not be available yet as the DOM has not been created.
     *
     * @description
     * Useful for fetching initial data or setting up event listeners.
     */
    created() {
        console.log('From counter.vue | created');
    },

    /**
     * Called right before the component is to be mounted.
     *
     * When this hook is called, the component has finished setting up its reactive state,
     * but no DOM nodes have been created yet. It is about to execute its DOM render effect for the first time.
     * This hook is not called during server-side rendering.
     *
     * @description
     * Useful for performing tasks that need to happen right before the component is rendered.
     * For example, you might want to set up some initial state or perform some calculations
     * that will be used in the render function.
     */
    beforeMount() {
        console.log('From counter.vue | beforeMount');
    },

    /**
     * Called after the component has been mounted.
     *
     * A component is considered mounted after:
     *
     * All of its synchronous child components have been mounted (does not include async
     * components or components inside <Suspense> trees).
     *
     * Its own DOM tree has been created and inserted into the parent container. Note it only guarantees
     * that the component's DOM tree is in-document if the application's root container is also in-document.
     *
     * This hook is typically used for performing side effects that need access to the component's rendered DOM,
     * or for limiting DOM-related code to the client in a server-rendered application.
     *
     * This hook is not called during server-side rendering.
     *
     * @description
     * Useful for performing tasks that require access to the DOM, such as initializing third-party
     * libraries or setting up DOM event listeners. This is a good place to perform operations
     * that need to interact with the rendered DOM.
     */
    mounted() {
        console.log('From counter.vue | mounted');
    },

    /**
     * Called right before the component is about to update its DOM tree due to a reactive state change.
     *
     * This hook can be used to access the DOM state before Vue updates the DOM.
     * It is also safe to modify component state inside this hook.
     *
     * This hook is not called during server-side rendering.
     *
     * @description
     * Useful for performing tasks that need to happen before the DOM is updated, such as saving the current state.
     */
    beforeUpdate() {
        console.log('From counter.vue | beforeUpdate');
    },

    /**
     * Called after the component has updated its DOM tree due to a reactive state change.
     *
     * A parent component's updated hook is called after that of its child components.
     *
     * This hook is called after any DOM update of the component, which can be caused by different state changes.
     * If you need to access the updated DOM after a specific state change, use nextTick() instead.
     *
     * This hook is not called during server-side rendering.
     *
     * @WARNING Do not mutate component state in the updated hook - this will likely lead to an infinite update loop!
     *
     * @description
     * Useful for performing tasks that need to happen after the DOM is updated, such as updating third-party
     * libraries or performing DOM manipulations.
     */
    updated() {
        console.log('From counter.vue | updated');
    },

    /**
     * Called right before a component instance is to be unmounted.
     *
     * When this hook is called, the component instance is still fully functional.
     *
     * This hook is not called during server-side rendering.
     *
     * @description
     * Useful for cleaning up any tasks that were set up in the mounted hook,
     * such as clearing timers or cleaning up any DOM elements.
     */
    beforeUnmount() {
        console.log('From counter.vue | beforeUnmount');
    },

    /**
     * Called after a component instance has been unmounted.
     *
     * A component is considered unmounted after:
     *
     * All of its child components have been unmounted.
     *
     * All of its associated reactive effects (render effect and computed /
     * watchers created during setup()) have been stopped.
     *
     * @description
     * Use this hook to clean up manually created side effects such as timers, DOM event listeners or server connections.
     */
    unmounted() {
        console.log('From counter.vue | unmounted');
    }
};
</script>
