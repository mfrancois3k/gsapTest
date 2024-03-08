
        // Find the X (Horizontal, Left) position of an element 
        function pageX(elem) {
            // See if we're at the root element, or not 
            return elem.offsetParent ?
               
                // If we can still go up, add the current offset and recurse upwards 
                elem.offsetLeft + pageX( elem.offsetParent ) :
               
                // Otherwise, just get the current offset 
                elem.offsetLeft;
            }
                // Find the horizontal positioing of an element within its parent 
        function parentX(elem) {
            // If the offsetParent is the element's parent, break early 
            return elem.parentNode == elem.offsetParent ?
                elem.offsetLeft :
        
                // Otherwise, we need to find the position relative to the entire 
                // page for both elements, and find the difference
                pageX( elem ) - pageX( elem.parentNode ); 
        }
            
        // Find the left position of an element
        function posX(elem) {
            // Get the computed style and get the number out of the value 
            return parseInt( getStyle( elem, "left" ) );
        }
        
        function setX(elem, pos) {
            // Set the 'left' CSS property, using pixel units 
            elem.style.left = pos + "px";
        }
        
        // A function for adding a number of pixels to the horizontal 
        // position of an element
        function addX(elem,pos) {
            // Get the current horz. position and add the offset to it. 
                setX( posX(elem) + pos );
            }
        
         // Find the full, possible, width of an element (not the actual, 
        // current, width)
        function fullWidth( elem ) {
            // If the element is being displayed, then offsetWidth
            // should do the trick, barring that, getWidth() will work 
            if ( getStyle( elem, 'display' ) != 'none' )
                return elem.offsetWidth || getWidth( elem );
            
            // / Otherwise, we have to deal with an element with a display
            // / of none, so we need to reset its CSS properties to get a more 
            // / accurate reading
            const old = resetCSS( elem, { 
                display: '', 
                visibility: 'hidden', 
                position: 'absolute'
            });
        
        // Figure out what the full width of the element is, using clientWidth 
        // and if that doesn't work, use getWidth
            
            const w = elem.clientWidth || getWidth( elem );
        
            // Finally, restore the CSS properties back to what they were 
            restoreCSS( elem, old );
        
            // and return the full width of the element 
            return w;
        }
        
            // A function used for setting a set of CSS properties, which 
        // can then be restored back again later
        function resetCSS( elem, prop ) { 
            const old = {};
            // Go through each of the properties 
            for ( const i in prop ) {
                // Remember the old property value 
                old[ i ] = elem.style[ i ];
                // And set the new value 
                elem.style[ i ] = prop[i];
            }
            // Retun the set of changed values, to be used by restoreCSS 
            return old;
        }
        
        // Two Functions for Determining the Length and Width of the Current Web Page 
        
        // Returns the height of the web page
        // (could change if new content is added to the page) 
        function pageHeight() {
                return document.body.scrollHeight; 
        }
        
        // Returns the width of the web page 
        function pageWidth() {
                return document.body.scrollWidth; 
        }

        module.exports = {
            pageX,
            parentX,
            posX,
            setX,
            addX,
            fullWidth,
            pageHeight,
            pageWidth,
        };
        