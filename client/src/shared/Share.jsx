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
      //  default:document.location.href,
    };
  }

  clickShare() {
    let url = this.props.recipe.spoonacularSourceUrl;
    this.setState({
      twitter: "https://twitter.com/intent/tweet?url=" + url,
    });
    this.setState({
      facebook: "http://www.facebook.com/sharer.php?u=" + url,
    });
  }

  render() {
    return (
      <div>
        <i class="fab fa-twitter"></i>
        <a onClick={this.clickShare.bind(this)} href={this.state.twitter}>
          Twitter
        </a>
        {/* <span></span> */}
        <i class="fa-brands fa-facebook"></i>
        <a onClick={this.clickShare.bind(this)} href={this.state.facebook}>
          Facebook
        </a>
      </div>
    );
  }
}

export default Share;
