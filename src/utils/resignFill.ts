import { PDFDocument } from "pdf-lib";
import { readFile, writeFile, rm } from "fs/promises";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
import prisma from "../database/prisma";

const pdfPath = path.join(
  process.cwd(),
  "src",
  "assets",
  "resign",
  "resign.pdf"
);
const outputPath = path.join(process.cwd(), "src", "assets", "temp");
const fontPath = path.join(
  process.cwd(),
  "src",
  "assets",
  "fonts",
  "THSarabun.ttf"
);

export const resignFill = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) return { error: "User not found" };

  try {
    const pdfDoc = await PDFDocument.load(await readFile(pdfPath));
    pdfDoc.registerFontkit(fontkit);
    const THSarabunPSK = await pdfDoc.embedFont(await readFile(fontPath));

    const form = pdfDoc.getForm();

    const fDay = form.getTextField("day");
    const fMonth = form.getTextField("month");
    const fYear = form.getTextField("year");

    const fId1 = form.getTextField("id1");
    const fId2 = form.getTextField("id2");
    const fId3 = form.getTextField("id3");
    const fId4 = form.getTextField("id4");
    const fId5 = form.getTextField("id5");
    const fId6 = form.getTextField("id6");
    const fId7 = form.getTextField("id7");
    const fId8 = form.getTextField("id8");
    const fID = [fId1, fId2, fId3, fId4, fId5, fId6, fId7, fId8];

    const fIsMale = form.getCheckBox("isMale");
    const fIsFemale = form.getCheckBox("isFemale");

    const fFirstName = form.getTextField("firstName");
    const fLastName = form.getTextField("lastName");

    const fDepartment = form.getTextField("department");
    const fMajor = form.getTextField("major");
    const fProgram = form.getTextField("program");
    const fStdYear = form.getTextField("stdYear");

    const fFullName = form.getTextField("fullName");

    const now = new Date();
    fDay.setText(now.getDate().toString());
    fDay.updateAppearances(THSarabunPSK);
    const month = [
      "มกราคม",
      "กุมภาพันธ",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    fMonth.setText(month[now.getMonth()]);
    fMonth.updateAppearances(THSarabunPSK);
    fYear.setText((now.getFullYear() + 543).toString());
    fYear.updateAppearances(THSarabunPSK);

    for (let i = 0; i < 8; i++) {
      fID[i].setText(user.id[i]);
      fID[i].updateAppearances(THSarabunPSK);
    }

    switch (user.title) {
      case "นาย": {
        fIsMale.check();
        break;
      }
      case "นางสาว": {
        fIsFemale.check();
        break;
      }
    }

    fFirstName.setText(user.firstName);
    fFirstName.updateAppearances(THSarabunPSK);
    fLastName.setText(user.lastName);
    fLastName.updateAppearances(THSarabunPSK);

    fDepartment.setText("วิศวกรรมศาสตร์");
    fDepartment.updateAppearances(THSarabunPSK);
    fMajor.setText("วิศวกรรมคอมพิวเตอร์");
    fMajor.updateAppearances(THSarabunPSK);
    fProgram.setText(user.program);
    fProgram.updateAppearances(THSarabunPSK);

    fStdYear.setText(
      (((now.getFullYear() + 543) % 100) -
        parseInt(user.id[1]) +
        now.getMonth() >=
      6
        ? 1
        : 0
      ).toString()
    );
    fStdYear.updateAppearances(THSarabunPSK);

    fFullName.setText(`${user.firstName} ${user.lastName}`);
    fFullName.updateAppearances(THSarabunPSK);

    form.flatten();

    const pdfBytes = await pdfDoc.save();
    const outputFile = path.join(outputPath, `${user.id}.pdf`);
    await writeFile(outputFile, pdfBytes);

    return { error: false, path: outputFile };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const removeTemp = async (path?: string) => {
  if (!path) return;
  try {
    await rm(path);
  } catch (e) {}
};
