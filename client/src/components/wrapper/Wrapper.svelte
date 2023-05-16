
<script>
import { modalMessage, hideModal } from "../../stores/modalStore.js";




</script>



{#if $modalMessage}
<div class="modal">
    <div class="modal-content">
    <p>{$modalMessage}</p>
    <button on:click={hideModal}>Close</button>
    </div>
</div>
{/if}


<slot></slot>


<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }

    .modal-content {
        background-color: #000000;
        padding: 20px;
        border-radius: 4px;
        text-align: center;
    }
</style>