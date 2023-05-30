
<script>
    export let embedLink;
    let style;
    let src;
    let title;
    let href;

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


