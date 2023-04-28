import time
import datetime
from selenium import webdriver

from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),
                          options=options)

driver.get("https://programming-club-daiict.up.railway.app/")
driver.maximize_window()

time.sleep(2)

links = driver.find_elements("xpath", "//a[@href]")
for link in links:
    if "Admin Login" in link.get_attribute('innerHTML'):
        link.click()
        break

time.sleep(2)

email_field = driver.find_element("xpath", "//input[@name='email']")
email_field.send_keys("202001265@daiict.ac.in")

time.sleep(2)

password_field = driver.find_element("xpath", "//input[@name='password']")
password_field.send_keys("Kishan@65")

time.sleep(1)

login_button = driver.find_element("xpath",
                                   "//button[contains(text(), 'Login')]")
time.sleep(2)
login_button.click()

driver.execute_script("window.scrollBy(0, window.innerHeight); \
                        var start_time = new Date().getTime(); \
                        while (new Date().getTime() - start_time < 2000);")
time.sleep(2)
driver.execute_script("window.scrollBy(0, window.innerHeight); \
                        var start_time = new Date().getTime(); \
                        while (new Date().getTime() - start_time < 2000);")
time.sleep(2)

user_link = driver.find_element("link text", 'User')
user_link.click()
time.sleep(2)
driver.execute_script("window.scrollBy(0, window.innerHeight); \
                        var start_time = new Date().getTime(); \
                        while (new Date().getTime() - start_time < 2000);")
time.sleep(2)
driver.execute_script("window.scrollBy(0, window.innerHeight); \
                        var start_time = new Date().getTime(); \
                        while (new Date().getTime() - start_time < 2000);")
time.sleep(2)
rsrc_link = driver.find_element("link text", 'Resource')
rsrc_link.click()
time.sleep(2)
add_rsrc_link = driver.find_element("link text", 'Add Resource')
add_rsrc_link.click()

enter_rsrc_field = driver.find_element("xpath", "//input[@name='title']")
enter_rsrc_field.send_keys("X Testing Resource")

enter_rsrc_des = driver.find_element("xpath",
                                     "//textarea[@name='description']")
enter_rsrc_des.send_keys("Resource Description")

enter_rsrc_link = driver.find_element("xpath", "//textarea[@name='link']")
enter_rsrc_link.send_keys("https://www.youtube.com/watch?v=zOjov-2OZ0E&ab_channel=freeCodeCamp.org")

time.sleep(2)
add_rsrc_button = driver.find_element(
    "xpath", "//button[contains(text(), 'Add Resource')]")
add_rsrc_button.click()

time.sleep(2)
rsrc_link = driver.find_element("link text", 'Resource')
rsrc_link.click()
add_rsrc_link = driver.find_element("link text", 'Resource Dashboard')
add_rsrc_link.click()

explr_rsrc_button = driver.find_element(
    "xpath", "//button[contains(text(), 'Explore')]")
explr_rsrc_button.click()
time.sleep(3)
driver.switch_to.window(driver.window_handles[-1])
driver.close()
driver.switch_to.window(driver.window_handles[0])

time.sleep(3)

updt_rsrc_button = driver.find_element(
    "xpath", "//button[contains(text(), 'update resource')]")
updt_rsrc_button.click()

enter_updt_rsrc_field = driver.find_element("xpath", "//input[@name='title']")
enter_updt_rsrc_field.clear()
enter_updt_rsrc_field.send_keys("Updated Testing Resource")

enter_updt_rsrc_des = driver.find_element("xpath",
                                          "//textarea[@name='description']")
enter_updt_rsrc_des.clear()
enter_updt_rsrc_des.send_keys("Updated Resource Description")

enter_updt_rsrc_link = driver.find_element("xpath", "//textarea[@name='link']")
enter_updt_rsrc_link.clear()
enter_updt_rsrc_link.send_keys("https://www.youtube.com")

time.sleep(2)
save_change_button = driver.find_element(
    "xpath", "//button[contains(text(), 'Save Changes')]")
save_change_button.click()

time.sleep(2)
delete_rsrc_button = driver.find_element(
    "xpath", "//button[contains(text(), 'Delete resource')]")
delete_rsrc_button.click()

alert = driver.switch_to.alert
time.sleep(2)

# Click the "OK" button
alert.accept()
time.sleep(2)

# Switch back to the main window
driver.switch_to.default_content()