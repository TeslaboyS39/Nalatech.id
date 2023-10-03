<template>
    <div id="add-project-form">
        <form class="bg-secondary p-3 rounded">
            <!-- Name input -->
            <div class="form-outline mb-4">
                <input type="text" id="form4Example1" class="form-control" />
                <label class="form-label text-white" for="form4Example1">Project Title</label>
            </div>
    
            <!-- Message input -->
            <div class="form-outline mb-4">
                <textarea class="form-control" id="form4Example3" rows="4"></textarea>
                <label class="form-label text-white" for="form4Example3">Description</label>
            </div>
    
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4">Add Project</button>
        </form>
    </div>
</template>

<style>
#add-project-form {
    padding-top: 3vh;
    padding-left: 10vh;
    padding-right: 10vh;
    padding-bottom: 9.6vh;
}
</style>