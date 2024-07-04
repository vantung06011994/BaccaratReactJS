import React from "react";

class CanvasImage extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.canvasRef = React.createRef();
        // this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.image.imageObject) {
            this.loadImage();
        }
    }
    loadImage() {
        if (this.props.image.imageObject) {
            const canvas = this.canvasRef.current;
            const context = canvas.getContext("2d");
            context.drawImage(this.props.image.imageObject, 0, 0, canvas.width, canvas.height);
        }
    }
    render() {
        return <canvas ref={this.canvasRef} style={{ width: "100%" }} width={458} height={257} />;
    }
}

export default CanvasImage;
