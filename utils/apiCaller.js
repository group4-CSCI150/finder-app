module.exports = {
    getUserByID: async (id) => {
        try {
            const users = await fetch(`https://us-central1-test150project.cloudfunctions.net/api/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return users.json();
        }
        catch {
            this.setState({ message: "Something went wrong plz try again" })
        }
    }
}