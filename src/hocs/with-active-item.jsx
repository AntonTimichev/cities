import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  return class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: 0
      };

      this._handleItemClick = this._handleItemClick.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem={activeItem}
        onItemClick={this._handleItemClick}
      />;
    }

    _handleItemClick(i) {
      this.setState({activeItem: i});
    }
  };
};

export default withActiveItem;
