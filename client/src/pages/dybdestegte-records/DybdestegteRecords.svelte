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
                comments.reverse();
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
            comments = [shownComment, ...comments];
            scrollToTop();
        })
        await handleGetAllMusic();
        await handleGetComments();
        
    });

    async function scrollToTop() {
        await tick();
        if(selectedDiv) {
            selectedDiv.scrollTop = 0
        }
    }


    

</script>




<div class="wrapper">
{#each allMusic as music, index}
    <div class="music-container">
        <div class="player">
            <BandcampPlayer embedLink={music.music.embedLink}/>
        </div>
            <div class="music-description">
                <h1>{music.music.artist}</h1>
                <h2>{music.music.albumTitle}</h2>
                <p>{music.music.releaseDate}</p>
                <p>{music.music.description}</p>
            </div>   
                <div class="comments-form-container">
                <div class="comments-form">
                    <form on:submit|preventDefault="{() => handleSendComment(music.music._id, index)}">
                        <div>
                            <textarea rows="3" cols="50" placeholder="Leave a comment..." bind:value="{commentIndexer[index]}"/>
                        </div>
                        {#if $loggedInUser}
                            <button type="submit">Comment</button>
                        {:else}
                            <p>Sign in to comment</p>
                        {/if}
                        
                    </form>
                </div>
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
            </div>
        
    </div>
{/each}
</div>
<style>
    .music-container {
        display: grid;
        padding: 30px;
        padding-top: 50px;
        grid-template-areas: "player description description"
                            "player leave-comment leave-comment"
                            "player comments comments";
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto 1fr auto;
        grid-gap: 5px;
        
    }

    .comments-form-container{
        align-self: self-end;
        padding-right: 50px;
    }

    .player{
        margin: 0 auto;
        grid-area: player;
    }

    .comments {
        grid-area: comments;
        height: 30vh;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .music-description {
        grid-area: description;
        padding-right: 50px;
        
    }

    .comments-form{
        grid-area: leave-comment;
    }

    .comment {
    margin-bottom: 10px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2);
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
    background-color: rgba(0, 0, 0, 0.4);
    }

    form {
    margin-top: 0;
    color: white;
    }

    form div {
    margin-bottom: 10px;
    }

    form button {
    padding: 5px 10px;
    }

    textarea {
        background-color:rgba(0, 0, 0, 0.1);
        color: white;
        border: 1px solid #ccc;
    }

    .wrapper{
        background-image: url("../../images/backgrounds/church.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        background-attachment: fixed;
        background-color: rgba(0, 0, 0, 0.2);
        background-blend-mode: multiply;
    }

    p, h1, h2{
        color: white;
    }

</style>