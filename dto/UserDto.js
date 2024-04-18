class UserDto {
    id;
    email;
    name;
    avatarURL;
    themeId;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.avatarURL = model.avatarURL;
        this.themeId = model.themeId;
    }
}

export default UserDto;
