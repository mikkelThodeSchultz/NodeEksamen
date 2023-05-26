
<script>
    export let embedLink;
    let style;
    let src;
    let title;
    let href;

    // <iframe style="border: 0; width: 350px; height: 622px;" src="https://bandcamp.com/EmbeddedPlayer/album=2276781933/size=large/bgcol=ffffff/linkcol=0687f5/package=1797137217/transparent=true/" seamless><a href="https://dybdestegte.bandcamp.com/album/demo-i">Demo I by Shrug</a></iframe>
    const regex = /^<iframe\s.*src="https:\/\/bandcamp\.com\/EmbeddedPlayer\/.*<\/iframe>$/;
    
    export async function inputValidation(){
            if (!regex.test(embedLink)) {
        return true;
        }
        return false;
    }


    const styleStartIndex = embedLink.indexOf('style="') +7;
    const styleEndIndex = embedLink.indexOf('"', styleStartIndex)
    style = embedLink.substring(styleStartIndex, styleEndIndex);

    const srcStartIndex = embedLink.indexOf('src="') + 5;
    const srcEndIndex = embedLink.indexOf('"', srcStartIndex);
    src = embedLink.substring(srcStartIndex, srcEndIndex);

    const titleStartIndex = embedLink.indexOf('">') + 2;
    const titleEndIndex = embedLink.indexOf('</a>', titleStartIndex);   
    title = embedLink.substring(titleStartIndex, titleEndIndex);

    const hrefStartIndex = embedLink.indexOf('href="') + 6;
    const hrefEndIndex = embedLink.indexOf('"', hrefStartIndex);
    href = embedLink.substring(hrefStartIndex, hrefEndIndex);
</script>


<div>
    <iframe style="{style}" src="{src}" 
        title="{title}">
        <a href="{href}">{title}</a>
    </iframe>
</div>


