export const email = 'contact.crowdr@gmail.com';

export const openEmail = () => {
     
       const mailtoUrl = `mailto:${email}`;
     
       window.open(mailtoUrl, '_blank');
}