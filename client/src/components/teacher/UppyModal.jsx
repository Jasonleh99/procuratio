import React, { Component } from "react";

import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { DashboardModal } from "@uppy/react";

import { Button, Typography } from "@material-ui/core";

class AvatarPicker extends Component {
  state = { modalOpen: false };

  handleUploadModalOpen = () => this.setState({ modalOpen: true });
  handleUploadModalClose = () => this.setState({ modalOpen: false });

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    const { handleUploadCompleted } = this.props;
    const { url } = this.state;

    this.uppy = Uppy({
      meta: { type: "avatar" },
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1
      }
    });

    this.uppy.use(Tus, { endpoint: "https://master.tus.io/files/" });

    this.uppy.on("complete", result => {
      console.log("Completed upload, result:", result);
      const id = result.successful[0].id;
      const url = result.successful[0].uploadURL;
      if (url !== undefined) {
        alert("Upload successful");
      }
      handleUploadCompleted(id, url);
    });

    this.uppy.run();

    return (
      <div style={{ height: "100%"}}>
        <DashboardModal
          uppy={this.uppy}
          closeModalOnClickOutside
          open={this.state.modalOpen}
          onRequestClose={this.handleUploadModalClose}
        />
        <Button
          onClick={this.handleUploadModalOpen}
          style={{ height: "100%" }}
          color="primary"
          variant="contained"
        >
          Upload your file
        </Button>
      </div>
    );
  }
}

export default AvatarPicker;
