import styled from "styled-components";

const FlexContainer = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.direction || "row"};
    flex-wrap: ${(props)=> props.wrap || "nowrap"};
    justify-content: ${(props)=> props.justifycontent || "flex-start"};
    align-items: ${(props)=> props.alignitems || "stretch"};
    align-content: ${(props)=> props.aligncontent || "normal"};
    gap: ${(props)=> props.gap || 0};
    height: ${(props)=> props.height || "auto"};
    max-height: ${(props)=> props.maxheight || "none"};
    overflow: ${(props)=> props.overflow || "none"};
    width: ${(props)=> props.width || "100%"};

    ::-webkit-scrollbar { display: none; }
`

const FlexItem = styled.div`
    order: ${(props)=> props.order || 0};
    flex-grow: ${(props)=> props.grow || 0};
    flex-shrink: ${(props)=> props.shrink || 1};
    align-self: ${(props)=> props.alignself || "auto"};
`

export {FlexContainer,FlexItem}

