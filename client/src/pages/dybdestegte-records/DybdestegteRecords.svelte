<script>
    import BandcampPlayer from "../../components/bandcampPlayer/BandcampPlayer.svelte";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";
    import { getSocket } from "../../socketManager/socketManager";
    import { loggedInUser } from "../../stores/globalStore";
    import toastr from "toastr";
    import { formatDate } from "../../dateFormater/formatDate";
    import { tick } from "svelte";

    let allMusic = [];
    let commentIndexer = [];
    let commentToServer;
    let commentFromServer;
    let comments = [];
    let commentsDivs = [];
    let selectedDiv;

    const socket = getSocket();

    const handleGetAllMusic = async () => {
        try {
            const response = await fetch($BASE_URL + '/api/allMusic', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            allMusic = allMusic.concat(result.data);
            
        }catch(error){
        console.log(error);
        }
    };

    const handleGetComments = async () => {
        try{
            const response = await fetch($BASE_URL + '/api/comments', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            result.data.forEach(comment => {
                const date = formatDate(comment.timeStamp)
                commentFromServer = {
                    comment: `${comment.userName}: ${comment.comment}`,
                    time: `${date}`,
                    musicId: comment.musicId
                }
                comments = [...comments, commentFromServer];
            })
        }catch(error){
            console.log(error);
        }
    }

    function handleSendComment(musicId, index) {
        selectedDiv = commentsDivs[index];
        const comment = commentIndexer[index]
        commentIndexer[index] = "";
        if(!comment){
            toastr.warning("Please write a comment")
            return;
        }
        const timeStamp = new Date();
        commentToServer = {userName: $loggedInUser, comment: comment, timeStamp: timeStamp, musicId: musicId};
        socket.emit('music comment to server', commentToServer)

    };

    onMount(async () => {   
        socket.on('music comment to client', (recievedComment) => {
            const date = formatDate(recievedComment.timeStamp)
            const shownComment = {
                comment: `${recievedComment.userName}: ${recievedComment.comment}`,
                    time: `${date}`,
                    musicId: recievedComment.musicId
            }
            comments = [...comments, shownComment];
            scrollToBottom();
        })
        await handleGetAllMusic();
        await handleGetComments();
        await scrollToBottomOnLoad();
        
    });

    async function scrollToBottomOnLoad() {
        for (let i = 0; i < allMusic.length; i++){
            selectedDiv = commentsDivs[i];
            selectedDiv.scrollTop = selectedDiv.scrollHeight;
        }
    }

    async function scrollToBottom() {
        await tick();
        if(selectedDiv) {
            selectedDiv.scrollTop = selectedDiv.scrollHeight;
        }
    }


    

</script>



<h1>DET HER ER RECORDS</h1>


{#each allMusic as music, index}
    <div class="music-container">
            <BandcampPlayer embedLink={music.music.embedLink}/>    
            <div class="music-details">
                <p>Artist: {music.music.artist}</p>
                <p>Album: {music.music.albumTitle}</p>
                <p>Release date: {music.music.releaseDate}</p>
            </div>
            <div class="comments-form-container">
                <div class="comments" bind:this={commentsDivs[index]}>
                    {#each comments as {comment, time, musicId}}
                        {#if music.music._id === musicId}
                        <div class="comment">
                            <p class="comment-text">{comment}</p>
                            <p class="comment-time">{time}</p>
                        </div>
                        {/if}
                    {/each}
                </div>

        <form on:submit|preventDefault="{() => handleSendComment(music.music._id, index)}">
            <h2>Leave a Comment</h2>
            <div>
                <input type="text" bind:value="{commentIndexer[index]}"/>
            </div>
            {#if $loggedInUser}
                <button type="submit">Submit</button>
            {:else}
                <p>Sign in to comment</p>
            {/if}
            
        </form>

        </div>
    </div>
{/each}

<style>
    .music-container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 6vh;
    padding: 10px;
    }

    .music-details {
    margin-left: 10px;
    }

    .music-details p {
    margin: 0;
    }

    .comments-form-container {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    }

    .comments {
    flex-grow: 1;
    max-height: 40vh;
    overflow-y: auto;
    }

    .comment {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    }

    .comment-text {
    margin: 0;
    }

    .comment-time {
    margin-top: 5px;
    font-size: 12px;
    color: #888;
    }

    form {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    form h2 {
    margin-top: 0;
    }

    form div {
    margin-bottom: 10px;
    }

    form button {
    padding: 5px 10px;
    }

</style>