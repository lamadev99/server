import React, { useState, useEffect } from 'react';
import { Parser } from 'html-to-react';
const IframeExtract = ({content})=> {
    console.log(content)
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Define the HTML content that includes an <iframe> element
    const htmlContent = 'lsjljrle <iframe width="560" height="315" src="https://www.youtube.com/embed/KaSFoOF6Yw0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

    const parse = new Parser()
    const parsedata = parse.parse(content)
    console.log(parsedata)
    
    // Use DOMParser to parse the HTML content into a Document object
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Use querySelector to find the <iframe> element and get its "src" attribute
    const iframe = doc.querySelector('iframe');
    const src = iframe ? iframe.getAttribute('src') : '';

    // Set the "src" attribute of the <iframe> element as the state
    setIframeSrc(src);
  }, []);


  return (
    <div>
      <p>Some text here</p>
      {iframeSrc && <iframe src={iframeSrc}></iframe>}
      <div>
        <p>{iframeSrc}</p>
      </div>
    </div>
  );
}

export default IframeExtract