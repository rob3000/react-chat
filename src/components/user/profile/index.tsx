import * as React from 'react';
import { AuthInterface } from 'auth';
import { AuthContextConsumer } from 'auth/authContext';
import imageSrc from 'images/man.svg';
import Image from 'components/image';
import UserMenu from 'components/user/menu';
import './profile.scss';

interface Props {
  auth: AuthInterface;
}

interface AuthProfile {
  picture: string;
  name: string;
}

interface State {
  profile: AuthProfile;
}

class ProfileDisplay extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      profile: {
        picture: imageSrc,
        name: "Joe Blogs",
      }
    }
  }

  componentDidMount() {
    var _this = this;
    this.props.auth.getProfile().then((profile: any) => {
      _this.setState({
        profile: profile
      })
    })
  }

  render() {
    const profile = this.state.profile;
    return (
      <div>
        <div className="profile">
          <div className="profile__avatar">
            <Image src={profile.picture} alt={profile.name} circle={true} />
          </div>
          <h2 className="profile__name">{profile.name}</h2>
        </div>
        <AuthContextConsumer>
          {auth => auth && (
            <UserMenu auth={auth} />
          )}
        </AuthContextConsumer>
      </div>
    );
  }
}

export default ProfileDisplay;
