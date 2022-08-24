import React, { useState } from 'react';

function Tooltip(props) {

    /* useState */
    const [tooltip, showTooltip] = useState(false);

    /* Style Properties */
    const style = {
        wrapper: {
            position: 'relative'
        },
        tooltip: {
            display: 'block',
            position: 'absolute',
            width: 'fit-content',
            padding: '3px 10px',
            whiteSpace: 'nowrap',
            borderRadius: props.style?.borderRadius || '5px',
            fontFamily: props.style?.fontFamily || 'Helvetica Neue',
            fontSize: props.style?.fontSize || '14px',
            color: props.style?.color || 'white',
            backgroundColor: props.style?.backgroundColor || 'rgba(0, 0, 0, 0.6)',
            ...(!props.tooltipPosition && {top: '-30px'}),
            ...(props.tooltipPosition === 'top' && { top: '-30px' }),
            ...(props.tooltipPosition === 'bottom' && { bottom: '-30px'}),
            ...(props.tooltipPosition === 'left' && { left: '-110px' }),
            ...(props.tooltipPosition === 'right' && { right: '-110px' }),
        }
    };

    return (
        <div style={style.wrapper}
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => showTooltip(false)}>
            {props.children}
            {
                tooltip && (
                    <label style={style.tooltip}>Xontent{props.content}</label>
                )
            }
        </div>
    );
}

export default Tooltip;