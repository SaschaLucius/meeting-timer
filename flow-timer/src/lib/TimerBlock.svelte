<script lang="ts">
    import Self from './TimerBlock.svelte';

    interface Timer {
        name: string,
        duration?: string,
        repetitions?: string,
        timers?: Timer[] | undefined,
        description?: string
    }
    export let timer: Timer = {
        name: "",
        duration: "00:00:00",
        repetitions: "",
        timers: [],
        description: ""
    };
    
    function addSubTimer() {
        const subTimer = {
            name: "",
            duration: "",
            repetitions: "",
            timers: [],
            description: ""
        };
        timer.duration = "";
        if(timer.timers){
            timer.timers.push(subTimer);
        }else{
            timer.timers = [subTimer];
        }
    }

    export let deleteMyself = () => {};

</script>

<div class="timer-block">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="delete-button" onclick={deleteMyself}>×</span>
    <input placeholder="Name" bind:value={timer.name} required style="width: 25%;" />
    <input placeholder="Duration HH:MM:SS" bind:value={timer.duration} style="width: 25%;" />
    <input placeholder="Repetitions" type="number" min="2" bind:value={timer.repetitions} style="width: 25%;" />
    <input placeholder="Description" bind:value={timer.description} style="width: calc(75% + 48px);" />
    <div class="timer-list">
      <!-- Sub-timers will be nested here -->
      {#if timer.timers !== undefined && timer.timers.length > 0}
        {#each timer.timers as item, i}
            <div class="sub-timer">
                <Self bind:timer={timer.timers[i]} deleteMyself={() => {
                    timer.timers?.splice(i, 1)
                    timer.timers = timer.timers
                }}></Self>
        </div>
        {/each}
      
      {/if}
    </div>
    <button onclick={addSubTimer}>+</button>
    <button>Hide</button>
</div>

<style>
    .timer-block {
        border: 1px solid #ccc;
        padding: 16px;
        margin: 16px 0;
        border-radius: 8px;
        background-color: #f9f9f9;
        }

        .delete-button {
        color: red;
        font-weight: bold;
        cursor: pointer;
        float: right;
        margin-left: 8px;
        }

        .timer-block input {
        display: inline-block;
        margin: 8px 4px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        }

        .timer-block .timer-list {
        margin-top: 16px;
        padding-left: 16px;
        border-left: 2px solid #ddd;
        }

        .timer-block .sub-timer {
        margin-bottom: 16px;
        }

        .timer-block button {
        margin: 8px 4px;
        padding: 8px 12px;
        font-size: 14px;
        border: 1px solid #007BFF;
        border-radius: 4px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        }

        .timer-block button:hover {
        background-color: #0056b3;
        }

</style>
  