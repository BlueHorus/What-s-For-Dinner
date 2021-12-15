import React from "react";
import { render } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Instagram } from "@mui/icons-material";

class Share extends React.Component {
  constructor() {
    super();

    this.state = {
      twitter: "",
      facebook: "",
      Instagram: "",
    };
  }

  clickShare() {
    let url = document.location.href;
    this.setState({
      twitter: "https://twitter.com/intent/tweet?url=" + url,
    });
    this.setState({
      facebook: "http://www.facebook.com/sharer.php",
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.clickShare.bind(this)} href={this.state.twitter}>
          <i class="fab fa-twitter"></i>
        </a>

        <a onClick={this.clickShare.bind(this)} href={this.state.facebook}>
          <i class="fa-brands fa-facebook"></i>
        </a>
      </div>
    );
  }
}

export default Share;
