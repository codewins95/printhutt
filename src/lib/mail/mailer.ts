import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import UserModel from '@/models/userModel'
import type { mallerType } from '@/lib/types';
import { formatCurrency } from '../../helpers/helpers';
import { getCustomerEmailTemplate } from './templates/customer';
import { getOwnerEmailTemplate } from './templates/owner';


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  // secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerifyEmail = async ({ email, emailType, userId }: mallerType) => {
  try {
    const hashedToken = uuidv4();
    if (emailType === 'VERIFY') {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (emailType === 'RESET') {
      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
      })
    }

    const mailOption = {
      from: '"' + process.env.APP_NAME + '" ' + process.env.SMTP_FROM,
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `
                click <a href="${process.env.APP_URL}/verifyemail?token=${hashedToken}">here</a>
                to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser.</p>
            `,
    }

    const mailResponce = await transporter.sendMail(mailOption)
    return mailResponce;
  } catch (error: any) {
    throw new Error((error as Error).message)
  }
}

export const sendOtpByEmail = async (email: string, otp: string) => {
  const mailOption = {
    from: '"' + process.env.APP_NAME + '" ' + process.env.SMTP_FROM,
    to: email,
    subject: 'Your OTP Code',
    html: `Your OTP is ${otp}`
  }

  try {
    const mailResponce = await transporter.sendMail(mailOption)
    return mailResponce;
  } catch (error: any) {
    throw new Error((error as Error).message)
  }
}

export const sendOtpBySms = async (_mobile: string, _otp: string) => {
  // Replace with your SMS service logic
  // return someSmsService.send({
  //     to: mobile,
  //     message: `Your OTP is ${otp}`,
  // });
}

export async function sendOrderConfirmationEmail(orderData: {
  email: string;
  orderId: string;
  items: any[];
  totalAmount: number;
  payment: string;
  shipping: string;
  coupon?: string;
}) {
  // Send customer confirmation
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: orderData.email,
    subject: `Order Confirmation - ${orderData.orderId}`,
    html: getCustomerEmailTemplate({
      orderId: orderData.orderId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      payment: orderData.payment,
      shipping: orderData.shipping,
      coupon: orderData.coupon,
      formatCurrency,
    }),
  });

  // Send owner notification
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SHOP_OWNER_EMAIL,
    subject: `New Order Received - ${orderData.orderId}`,
    html: getOwnerEmailTemplate({
      orderId: orderData.orderId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      payment: orderData.payment,
      shipping: orderData.shipping,
      coupon: orderData.coupon,
      formatCurrency,
    }),
  });
}
