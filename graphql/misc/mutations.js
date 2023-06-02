const gql = require('graphql-tag');

module.exports.uploadSecureImage = gql`
  mutation UploadSecureImage($input: imageUploadInput!) {
    uploadSecureImage(input: $input) {
      key
    }
  }
`;

module.exports.uploadImage = gql`
  mutation UploadImage($input: imageUploadInput!) {
    uploadImage(input: $input) {
      url
    }
  }
`;

module.exports.createContactUs = gql`
  mutation CreateContactUs(
    $email: String
    $name: String
    $message: String
    $reason: String
    $orderId: String
    $dispensaryName: String
  ) {
    createContactUs(
      email: $email
      name: $name
      message: $message
      reason: $reason
      orderId: $orderId
      dispensaryName: $dispensaryName
    ) {
      email
      name
      message
      reason
      orderId
      dispensaryName
    }
  }
`;
