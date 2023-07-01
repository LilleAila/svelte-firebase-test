<script lang="ts">
    import { user } from "$lib/firebase";
</script>

{#if $user}
    <slot />
{:else}
    <p class="text-error">
        You muse be signed in to view this page.
        <a class="btn btn-primary" href="/login">Sign in</a>
    </p>
{/if}