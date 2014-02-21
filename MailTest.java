package com.gd.mail.webdriver;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;

import java.util.regex.Pattern;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;


public class MailTest {

    WebDriver webDriver = new FirefoxDriver();
    String myLogin = "selenium.test1";
    String myPassword = "selenium123";
    String recipientMsg = "baskal.darya@gmail.com";
    String subjectMsg = "test";
    //Pattern p = Pattern.compile("[(][\\d][) ]");

    @BeforeClass
    public void loginToMail() {

        webDriver.get("https://mail.ru");

        WebElement login = webDriver.findElement(By.id("mailbox__login"));
        login.sendKeys(myLogin);

        WebElement password = webDriver.findElement(By.id("mailbox__password"));
        password.sendKeys(myPassword);

        WebElement submit = webDriver.findElement(By.id("mailbox__auth__button"));
        submit.click();

    }

    @AfterClass
    public void logout() {

        WebElement logout = webDriver.findElement(By.id("PH_logoutLink"));
        logout.click();
        webDriver.close();

    }

    @Test
    void testLogin() {

        WebElement logout = webDriver.findElement(By.id("PH_logoutLink"));
        assertTrue(logout.isDisplayed());

    }

    @Test
    public void testSendMsg() {

        webDriver.get("https://e.mail.ru/compose");

        WebElement recipient = webDriver.findElement(By.cssSelector("input.js-input.compose__labels__input"));
        recipient.sendKeys(recipientMsg);

        WebElement subject = webDriver.findElement(By.id("compose_223_ab_compose_subj"));
        subject.sendKeys(subjectMsg);

        WebElement sendMsgButton = webDriver.findElement(By.cssSelector("div.b-toolbar__btn > span.b-" +
                "toolbar__btn__text"));
        sendMsgButton.click();

        WebElement sendBlankMsg = webDriver.findElement(By.xpath("(//button[@type=\"submit\"])[22]"));
        sendBlankMsg.click();

        //final Wait<WebDriver> wait = new WebDriverWait(webDriver, 5, 1000);

        new WebDriverWait(webDriver, 10)
                .until(ExpectedConditions.titleContains("отправлено"));

        webDriver.getTitle();
        assertEquals(webDriver.getTitle(), "Письмо отправлено - " + myLogin + "@mail.ru - Почта Mail.Ru");

    }

    @Test
    public void testInbox() {

        WebElement inbox = webDriver.findElement(By.cssSelector("span.b-nav__item__text"));
        inbox.click();

        //assertEquals(webDriver.getTitle(), p + "Входящие - " + myLogin + "@mail.ru - Почта Mail.Ru");
        assertEquals(webDriver.getTitle(), "Входящие - " + myLogin + "@mail.ru - Почта Mail.Ru");

    }

    @Test
    public void testSent() {

        WebElement sent = webDriver.findElement(By.xpath("//*[@id=\'b-nav_folders\']/div/a[2]/div/span"));
        sent.click();

        new WebDriverWait(webDriver, 10)
                .until(ExpectedConditions.titleContains("Отправленные"));

        assertEquals(webDriver.getTitle(), "Отправленные - " + myLogin + "@mail.ru - Почта Mail.Ru");

    }

    @Test
    public void testDrafts() {

        WebElement drafts = webDriver.findElement(By.xpath("//div[@id=\'b-nav_folders\']/div/a[3]/div/span"));
        drafts.click();

        new WebDriverWait(webDriver, 10)
                .until(ExpectedConditions.titleContains("Черновики"));

        assertEquals(webDriver.getTitle(), "Черновики - " + myLogin + "@mail.ru - Почта Mail.Ru");

    }

}