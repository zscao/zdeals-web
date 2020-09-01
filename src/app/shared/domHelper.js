export const openLinkInNewTab = url => {
  if(!url) return;

  const win =  window.open(url);
  if (!win || win.closed || typeof win.closed === 'undefined') {
    //POPUP BLOCKED
    
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"
    link.rel = "noopener"

    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
  }
}