class User {
    constructor (user) {
        this.address = user.address != null ? user.address : '';
        this.birthDate = user.birthDate != null ? user.birthDate : '';
        this.firstName = user.firstName != null ? user.firstName : '';
        this.friends = user.friends != null ? user.friends : [];
        this.lastName = user.lastName != null ? user.lastName : '';
        this.petNames = user.petNames != null ? user.petNames : [];
    }
}

export default User;
