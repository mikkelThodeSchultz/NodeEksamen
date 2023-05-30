<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";
    import toastr from "toastr";

    let allComments = [];
    let commentId;

    const handleGetComments = async () => {
        try {
            const response = await fetch($BASE_URL + '/api/comments', {
                method:  'GET',
                credentials: 'include',
            });
            const result = await response.json();
            allComments = allComments.concat(result.data);
        }catch(error){
            console.log(error);
        }
    }

    async function handleDeleteComment(comment){
        commentId = comment._id;
        try{
            const response = await fetch ($BASE_URL + `/api/comment(${commentId})`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(response.ok){
                toastr.success("Comment have been deleted");
                allComments = [];
                await handleGetComments();
            }
        }catch(error){
            toastr.warning("An unexpected error has occured. Please try again")
            console.log(error);
        }
    }

    onMount(async () => {
        await handleGetComments();
    })

</script>

<h1>Comment List</h1>
<ul>
    {#each allComments as comment}
        <li class="comment-item">
            <div id="comment">
                <p>{comment.userName} - {comment.comment}</p>
            </div>
            <div id="delete-comment">
                <button on:click={() => handleDeleteComment(comment)} >Delete</button>
            </div>
        </li>
    {/each}
</ul>


<style>
    h1 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
        word-break: break-word;
        display: flex;
        justify-content: space-between;
    }

    .comment-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    p{
        padding: 10px;
        border: solid #000000;
        border-radius: 0px;
    }
    
    #delete-comment{
        word-break: keep-all;
    }

    button {
    padding: 10px;
    cursor: pointer;
    border: solid #000000;
    border-radius: 0px;
    }
    
    button:hover {
    background-color: #babab9;
    }

</style>