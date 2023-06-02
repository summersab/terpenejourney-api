const gql = require('graphql-tag');

module.exports.createContact = gql`
  mutation CreateContact($email: String!, $location: String, $zip: String) {
    createContact(email: $email, location: $location, zip: $zip) {
      email
    }
  }
`;

module.exports.updateTextSetting = gql`
  mutation UpdateTextSetting($enabled: Boolean!) {
    updateTextSetting(enabled: $enabled) {
      success
    }
  }
`;

module.exports.updateEmailMutation = gql`
  mutation UpdateEmail($email: String!, $password: String!) {
    updateEmail(email: $email, password: $password) {
      success
    }
  }
`;

module.exports.updateProfile = gql`
  mutation UpdateProfile($profile: consumerUserProfileInput!) {
    updateProfileV2(profile: $profile) {
      success
    }
  }
`;

module.exports.updateConsumerUser = gql`
  mutation UpdateConsumerUser($input: consumerUserProfileInput!) {
    updateConsumerUser(user: $input) {
      success
    }
  }
`;

module.exports.acceptTermsOfService = gql`
  mutation AcceptTermsOfService {
    acceptTermsOfService {
      success
    }
  }
`;

module.exports.setViewedTermsOfService = gql`
  mutation SetViewedTermsOfService {
    setViewedTermsOfService {
      success
    }
  }
`;

module.exports.logout = gql`
  mutation Logout {
    logout {
      message
      success
    }
  }
`;

module.exports.updateUser = gql`
  mutation UpdateUser($input: usersUpdateInput!) {
    updateUser(user: $input) {
      audioNotificationsOnNewArrivalsDisabled
      audioNotificationsOnNewOrdersDisabled
      chainID
      createdAt
      createdBy
      dispensaryId
      email
      fullName
      isWeeklyReportEnabled
      permissions {
        allLocations
        analytics
        billing
        customers
        dispensaryIds
        driver
        menu
        menuReview
        orders
        promote
        settings
        superMenuReview
        users
      }
      phone
      roleAtDispensary
      textNotifications
      type
      unsubscribedDispensaries
    }
  }
`;
