import {useState, useEffect} from "react";

export const useRightClickMenu = (wrapperId) => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [showContextMenu, setShowContextMenu] = useState(false);

    const handleContextMenu = (e) => {
        e.preventDefault();
        console.log("event of context menu -> ", e);
        setX(e.offsetX);

        setY(e.offsetY);

        setShowContextMenu(true);
    }

    const handleClick = () => {
        setShowContextMenu(false);
    }

    useEffect( () => {

        const wrapper = document.getElementById(wrapperId);
        window.addEventListener('click', handleClick);
        wrapper.addEventListener('click', handleClick);
        wrapper.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('click', handleClick);
            wrapper.removeEventListener('click', handleClick);
            wrapper.removeEventListener('contextmenu', handleContextMenu);
        }

    }, [x, y, showContextMenu, wrapperId] );

    return { x, y, showContextMenu, wrapperId }

}