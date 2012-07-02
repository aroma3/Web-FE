package com.baidu.testdemo;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
 
public class TestDemo extends DroidGap {
	 /** Called when the activity is first created. */
	//private Handler mHandler = new Handler();    
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	   
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/WWW/index.html");        
        String str="abc";
        System.out.print(str);           
         
        /* 
         * 生成js可调用的方法
        final WebView mWebView=super.appView;
        WebSettings webSetting = super.appView.getSettings() ;
        webSetting.setJavaScriptEnabled(true);
        mWebView.addJavascriptInterface(new Object() {    
            public void clickOnAndroid() {    
                mHandler.post(new Runnable() {    
                    public void run() {    
                        mWebView.loadUrl("javascript:wave()");    
                    }    
                });    
            }    
        }, "demo");  
        */
         
    }
}
