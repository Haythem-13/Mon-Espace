const addUser = (User) => async ({ email, billingID, plan, endDate }) => {
    if (!email || !billingID || !plan) {
        throw new Error('Missing data, please provide new values');
    }

    const user = new User({ email, billingID, plan, endDate });
    return await user.save();
};

const getUsers = (User) => async () => {
    return await User.find({});
};

const getUserByEmail = (User) => async (email) => {
    return await User.findOne({ email });
};

const getUserByBillingId = (User) => async (billingID) => {
    return await User.findOne({ billingID });
};

const updatePlan = (User) => async (email, newPlan) => {
    return await User.findOneAndUpdate({ email }, { plan: newPlan }, { new: true });
};

module.exports = (User) => {
    return {
        addUser: addUser(User),
        getUsers: getUsers(User),
        getUserByEmail: getUserByEmail(User),
        updatePlan: updatePlan(User),
        getUserByBillingId: getUserByBillingId(User),
    };
};
