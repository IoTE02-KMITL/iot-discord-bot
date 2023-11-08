import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import prisma from "../database/prisma";

export const register: Command = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register your account to the bot")
    .addStringOption((option) =>
      option
        .setName("สาขา")
        .setDescription("สาขาที่คุณเรียนอยู่")
        .setRequired(true)
        .setChoices(
          { name: "สห", value: "วศ.บ. วิศวกรรมระบบไอโอทีและสารสนเทศ" },
          {
            name: "2ปริญ",
            value:
              "วศ.บ. วิศวกรรมระบบไอโอทีและสารสนเทศ และ วท.บ. ฟิสิกส์อุตสาหกรรม",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("รหัสนักศึกษา")
        .setDescription("รหัสนักศึกษา 66XXXXXX")
        .setRequired(true)
        .setMinLength(8)
        .setMaxLength(8)
    )
    .addStringOption((option) =>
      option
        .setName("คำนำหน้า")
        .setDescription("คำนำหน้าชื่อ")
        .setRequired(true)
        .setChoices(
          { name: "นาย", value: "นาย" },
          { name: "นางสาว", value: "นางสาว" }
        )
    )
    .addStringOption((option) =>
      option.setName("ชื่อ").setDescription("ชื่อจริง").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("นามสกุล").setDescription("นามสกุล").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("เบอร์โทร")
        .setDescription("เบอร์โทรศัพท์ 0XXXXXXXXX")
        .setRequired(true)
        .setMinLength(10)
        .setMaxLength(10)
    )
    .addStringOption((option) =>
      option
        .setName("วันเกิด")
        .setDescription("วันเกิด DD/MM/YYYY ค.ศ.")
        .setRequired(true)
        .setMinLength(10)
        .setMaxLength(10)
    )
    .addStringOption((option) =>
      option.setName("line").setDescription("Line id")
    )
    .addStringOption((option) =>
      option.setName("instagram").setDescription("Instagram")
    ),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();
    const { user } = interaction;
    const program = interaction.options.getString("สาขา", true);
    const id = interaction.options.getString("รหัสนักศึกษา", true);
    const title = interaction.options.getString("คำนำหน้า", true);
    const firstName = interaction.options.getString("ชื่อ", true);
    const lastName = interaction.options.getString("นามสกุล", true);
    const phone = interaction.options.getString("เบอร์โทร", true);
    const birthday = interaction.options.getString("วันเกิด", true);
    const lineId = interaction.options.getString("line");
    const instagram = interaction.options.getString("instagram");

    const [bDay, bMonth, bYear] = birthday.split("/");
    const now = new Date();
    const birthdayDate = new Date(`${bMonth}/${bDay}/${bYear}`);
    if (birthdayDate >= now) {
      await interaction.editReply({
        content: "วันเกิดไม่ถูกต้อง",
      });
      return;
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (userExists) {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    }

    await prisma.user.create({
      data: {
        id,
        title,
        firstName,
        lastName,
        tel: phone,
        birthday: birthdayDate,
        lineId,
        instagram,
        program,
        discordUid: user.id,
      },
    });

    await interaction.editReply({
      content: "ลงทะเบียนสำเร็จ",
    });
  },
};
