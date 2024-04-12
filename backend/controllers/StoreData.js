const UserData = require("../models/UserData");
const User = require("../models/User");

exports.UserData = async(req,res) => {
    try{

        const userId = req.user.id;
        
        const {email,wpm,score,accuracy} = req.body;

        if(!wpm || !score || !accuracy){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // console.log(req.user.id);

        const createData = await UserData.create({
            wpm:wpm,
            score:score,
            accuracy:accuracy,
        })

        const user = await User.findByIdAndUpdate(req.user.id,
            {
                $push: {
                    userData: createData._id,
                }
            },
            {new:true}
        )
        .populate("userData");

        // const updatedData = user.userData.push(createData);

        console.log(user);

        return res.status(200).json({
            success:true,
            message:"UserData created successfully",
           
        })
    }

    
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"user data not found",
        })

    }
}


exports.getData = async(req,res) =>{
    try{
        const userId = req.user.id;

        // console.log(userId);

        const userDetails = await User.findOne({_id:userId},{
            firstName:true,
            lastName:true,
            email:true,
            userData:true
        })
        .populate("userData")
        .exec();

        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data:userDetails.userData,
        })
    }
    catch(error){

        return res.status(400).json({
            success:false,
            message:"Can't fetch data",
        });

    }
}

exports.deleteData = async(req,res) => {
    try{
        const {dataId } = req.body;
        const userId = req.user.id;

        const deleteData = await UserData.findByIdAndDelete({_id:dataId},
                                                    {new:true});

        const updatedData = await User.findByIdAndUpdate({_id:userId}, {
            $pull: {
                userData: deleteData._id,
            }
        },
    {new:true})
    .populate("userData");

    console.log(updatedData);


    return res.status(200).json({
        success:true,
        message:"data successfully deleted"
    })
    }
    catch(error){

        return res.status(400).json({
            success:false,
            message:"data can't successfully deleted"
        })

    }
} 

const deleteUser = async(req,res) => {
    try{
        const userId = req.user.id;

        const removeUser = await User.findByIdAndDelete({_id:userId},{
        new:true,
        })
    }
    catch(error){

    }
}