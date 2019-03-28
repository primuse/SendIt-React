import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ParcelTable } from './navs/table.jsx';
import InfoBox from './infoBox.jsx';
import TopNav from './navs/topNav.jsx';
import Aside from './navs/aside.jsx';
import '../css/modules.css';
import '../css/style.css';
import '../css/dashboard.css';


class DeliveredParcel extends Component {
  render() {
    const { deliveredParcels, isLoading } = this.props.parcel;
    const { user } = this.props.auth;
    return <main>
      <Aside user={user} />
      <section className='grey' id='dash'>
        <TopNav />
        <div id='main-content-page'>
          <InfoBox />
          <ParcelTable parcelText='Delivered' parcels={deliveredParcels}
            isLoading={isLoading} />
        </div>
      </section>
    </main>;
  }
}

DeliveredParcel.propTypes = {
  getUserParcels: PropTypes.func,
  deliveredParcels: PropTypes.array,
  parcel: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  parcel: state.parcel,
});

export default connect(mapStateToProps)(DeliveredParcel);
