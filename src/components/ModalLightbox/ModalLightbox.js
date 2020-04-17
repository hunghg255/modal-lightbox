import React from 'react';

import './ModalLightbox.css';
import SlideshowGallery from '../SlideshowGallery/SlideshowGallery';

export default class LightBox extends React.Component {
  constructor(props) {
    super(props);

    this.slideshowGallery = React.createRef();
    this.containerElm = React.createRef();
    this.modalElm = React.createRef();

    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal(index) {
    this.slideshowGallery.current.setSlideIndex(index);
    
    this.modalElm.current.style.visibility = "visible";
  }

  hideModal() {
    this.modalElm.current.style.visibility = "hidden";
  }

  updateDimensions() {
    const height = this.containerElm.current.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.current.style.height = `${height}px`;
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="lp-lightbox">
        <div className="container" ref={this.containerElm}>
          {
            this.props.input.map((image, index) => {
              return (
                <div
                  key={index}
                  className="image-wrapper"
                  style={{
                    width: `${1 / this.props.input.length * 100}%`,
                    height: `100%`
                  }}
                >
                  <img
                    className="image"
                    src={image.src}
                    alt={image.caption}
                    onClick={() => this.showModal(index)}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="modal" ref={this.modalElm}>
          <span className="close" onClick={this.hideModal}>×</span>
          <div className="modal-content">
            <SlideshowGallery
              ref={this.slideshowGallery}
              input={this.props.input}
              ratio={this.props.ratio}
              mode={`manual`}
            />
          </div>
        </div>
      </div>
    )
  }
}