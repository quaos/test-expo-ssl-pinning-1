//
//  RCTHTTPRequestHandler+TestDelegate.m
//
//  Created by Chakrit on 29/1/2567 BE.
//

#import <React/RCTHTTPRequestHandler.h>

@implementation RCTHTTPRequestHandler (TestDelegate)

- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge
 completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
  NSLog(@"RCTHTTPRequestHandler (TestDelegate).didReceiveChallenge: %@", completionHandler);
  
  completionHandler(NSURLSessionAuthChallengePerformDefaultHandling, nil);
}

@end

