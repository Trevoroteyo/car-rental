import User from "../../models/User.js";

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { roles: "owner" },
      },
      {
        new: true,
      }
    );

    await user.save()

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(`Error updating User role: ${error}`);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
