# My Understanding -- React Assessment

## My Steps

**2026-05-08-0932:**
- ผมว่าจะ prompt ให้ AI สร้าง app 100% ขึ้นมาก่อน แล้วรีเช็คว่าตรงตาม spec ที่ต้องการไหม จากนั้นจะแพ็คเรโปทั้งก้อนเป็นเฉลย แล้วโยนให้ AI ช่วยสร้างโจทย์สไตล์ codecademy จาก scratch to 100% target

**2026-05-08-1022:**
- ไปลิสต์ app requirement specs มาแล้ว เดี๋ยวจะ initialize project ด้วย starter ของคุณนิติไปก่อน
- พร้อมพ์ Claude Code ใน VSC ว่า "`ช่วยสร้าง react app ตามที่ @documentation/01_app-requirement-specification ระบุหน่อย ดู @documentation/03_React_JSD12--assessment.pdf เพื่ออ้างอิง design และ โจทย์เพิ่มเติม`"

**2026-05-08-1116:**
- สร้าง target-version repo เรียบร้อยแล้ว ลองตรวจเช็ค สามารถดึง member ได้ delete ได้ และ URL เปลี่ยนตาม page
- เดี๋ยวเอาตัว target ไปสร้างโจทย์ต่อด้วย Gem
- เล่นกระดาน API เพลินไปหน่อย

**2026-05-08-1235:**
- **Step 1: Home State & Mode Toggling**
	- [v] เปลี่ยน element ต่าง ๆ จากของเดิม 
		- *-- ยังไม่ได้สร้าง table & form UI // หาก็อปปี้ button มาจาก `Preline UI`* 
		- *-- ร่างไว้ที่ App ก่อน เดี๋ยวแยกไปเป็น component ทีหลัง ตอนนี้คิดว่าจะแยกเป็น pages: Home, Owner*
	- [v] สร้าง State ชื่อ `sector` (หรือ `mode`) เพื่อเก็บค่าว่าตอนนี้เป็น 'user' หรือ 'admin' 
		*-- default ไม่ได้ให้เป็น 'user' หรือ 'admin' ผมเลยใส่เป็น `null` ไว้ก่อน มั่ว ๆ*
	- [v] เมื่อกดปุ่ม ให้ Update State ตามโหมดที่เลือก
		- *-- ต้องไปดูว่าใช้เกี่ยวกับ event handling ยังไง* 
		- *-- น่าจะต้องสร้าง function ใหม่เป็น handler // ทำไมไม่ใส่ `setState()` เข้าไปที่ event handler เลย  ? -> เพราะถ้าใส่เมื่อเปิดเว็บครั้งแรก โค้ดทั้งหมดจะรันตอนเรนเดอร์ครั้งแรก โปรแกรมจะพยายามรัน `setState` แล้วค่อยเก็บค่าไว้ แต่เมื่อ `setState` รัน เว็บมันจะเรนเดอร์ใหม่ ทำให้มันรันวนไปอย่างนี้น เราจึงต้องประกาศฟังก์ชันเก็บไว้เฉย ๆ เมื่อผู้ใช้กระตุ้นอีเว้นท์ Browser ถึงจะส่ง `()` ไปรัน function แล้วเว็บก็จะเรนเดอร์ แต่ไม่วน เพราะวนมาก็มี แค่ function แบบที่ยังไม่รัน // แล้วทำไมไม่ใส่ `setState` เฉย ๆ โดยไม่ `()` ล่ะ ? -> ถ้าทำอย่างนั้นมันใส่พารามิเตอร์ไม่ได้* 
		- *-- ไม่สร้าง function ใหม่แล้ว ไปสร้าง anonymous arrow function ที่ event handler เลย เพราะต้อง `setState` หลายแบบ* 
	- [v] ด้านล่างปุ่ม ให้แสดงข้อความ Header `<h1>` ตาม State เช่น ถ้าเป็น User ให้โชว์ "Generation Thailand - Home (User Section)"
		- *-- โอเค ไม่ติดอะไร ก็อปเซ็คชั่นเดิม ๆ มาเปลี่ยนเนื้อหา ได้เข้าใจ shorthand ของ ternary operator ด้วย มีประโยชน์เวลาอยากรีเทิร์นค่าเดียว*

**2026-05-08-1453:**
- **Step 2: Data Fetching (GET) & Member Table**	
	- [v] สร้าง State ใหม่ชื่อ `members` (ตั้งค่าเริ่มต้นเป็น Array ว่าง `[]`) เพื่อเอาไว้เก็บข้อมูลที่ได้จาก API
	- [ ] ใช้ `useEffect` ยิง `fetch` ไปที่ URL: `https://67eca027aa794fb3222e43e2.mockapi.io/members`
		- *-- ได้ลงลึกเพิ่ม ว่า `useEffect` จะรันหลัง Render เสร็จสิ้น (ครอบคลุมทั้ง Mount และ Update) แต่ไม่ใช่ async ซะทีเดียว เป็น **Deferred** ส่งเข้า Effect Queue ของ React*
		- *-- เท่าที่เข้าใจเพิ่มขึ้น  `await` ทำหน้าที่แทน `.then` (เจาะเข้าไปเอาข้อมูลใน `Promise`) แต่ดีกว่าตรงที่เอาไป assign ให้ตัวแปรได้เลย แล้วเอาไปเรียกใช้ซ้ำง่าย เพราะถ้าเชนต่อกันแบบ `.then` ตัวหลัง ๆ จะกลับมาเรียก res ตัวแรก ๆ ลำบาก*
		- *-- กลับมารีแคปทำความเข้าใจ Promise fetch async await แบบลงลึก กินเวลาค่อนข้างเยอะ น่าจะทำเสร็จไม่ทัน คงต้องส่ง app ที่ AI gen มาก่อน*
	- [ ] เมื่อได้ข้อมูลมาแล้ว ให้ `setMembers(data)`
	- [ ] ในส่วนของ **User Section** และ **Admin Section** ให้เปลี่ยนจากข้อความธรรมดา เป็นการแสดง **Table** (ตาราง) โดยใช้คำสั่ง `.map()` เพื่อวนลูปเอาข้อมูลใน `members` มาแสดงผลในแถว (`<tr>`)
	    - [ ] คอลัมน์ที่ต้องโชว์: Name, Last Name, Position (และ Action สำหรับโหมด Admin)

**2026-05-08-1639:**
- Submitted this AI generated repo, click [here](https://github.com/jetwat/jsd12_exam-react-assessment.git) to see another repo built by myself.

## Reflection of my AI usage
- 5 คะแนนครับ ส่วนตัวคิดว่าไม่น่ายากในการทำความเข้าใจ แค่พอดีช่วงนี้เรียน JS ใน Exercism ใกล้ครบคอนเซปต์แล้ว เลยอยากจบ JS ก่อน แล้วมาอัด React ตาม วันนี้เท่าที่ทำเองก็ยังไม่ได้ติดคอนเซ็ปต์ของ React แต่ติดอยากทำความเข้าใจ JS แบบลงลึกมากกว่าครับ เลยใช้เวลาเกิน
