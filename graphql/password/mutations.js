const gql = require('graphql-tag');

module.exports.resetPasswordV2 = gql`
  mutation ResetPasswordV2($input: resetPasswordInput!) {
    resetPasswordV2(input: $input) {
      message
      success
    }
  }
`;

module.exports.sendPasswordResetEmailV2 = gql`
  mutation SendPasswordResetEmailV2($email: String!) {
    sendPasswordResetEmailV2(email: $email) {
      message
      success
    }
  }
`;

module.exports.setPasswordV2 = gql`
  mutation SetPasswordV2($input: setPasswordInput!) {
    setPasswordV2(input: $input) {
        message
        success
    }
  }
`;

module.exports.updatePasswordV2 = gql`
  mutation UpdatePasswordV2($oldPassword: String!, $newPassword: String!) {
    updatePasswordV2(oldPassword: $oldPassword, newPassword: $newPassword) {
      accessToken
    }
  }
`;
