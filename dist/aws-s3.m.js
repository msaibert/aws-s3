import e from"short-uuid";import t from"crypto-js";var r=new Date(+new Date+864e5).toISOString(),i=r.split("-").join("").split(":").join("").split(".").join(""),n=r.split("T")[0].split("-").join(""),o=function(){};o.getPolicy=function(e){return new Buffer(JSON.stringify({expiration:r,conditions:[{acl:"public-read"},{bucket:e.bucketName},["starts-with","$key",e.dirName?e.dirName+"/":""],["starts-with","$Content-Type",""],["starts-with","$x-amz-meta-tag",""],{"x-amz-algorithm":"AWS4-HMAC-SHA256"},{"x-amz-credential":e.accessKeyId+"/"+n+"/"+e.region+"/s3/aws4_request"},{"x-amz-date":i},{"x-amz-meta-uuid":"14365123651274"},{"x-amz-server-side-encryption":"AES256"}]})).toString("base64").replace(/\n|\r/,"")};var a=function(){};a.getSignature=function(e,r,i){var n,o,a,c,s,m;return t.HmacSHA256(i,(n=e.secretAccessKey,o=r,a=e.region,c=t.HmacSHA256(o,"AWS4"+n),s=t.HmacSHA256(a,c),m=t.HmacSHA256("s3",s),t.HmacSHA256("aws4_request",m))).toString(t.enc.Hex)};var c=function(e){this.config=e};c.prototype.uploadFile=function(t,r){try{var c=this;!function(e,t){if(null===e.bucketName||""===e.bucketName)throw new Error("Your bucketName cannot be empty ");if(null===e.region||""===e.region)throw new Error("Must provide a valide region in order to use your bucket");if(null===e.accessKeyId||""===e.accessKeyId)throw new Error("Must provide accessKeyId");if(null===e.secretAccessKey||""===e.secretAccessKey)throw new Error("Must provide secretAccessKey");if(!t)throw new Error("File cannot be empty")}(c.config,t);var s=new FormData,m=t.type.split("/")[1],u=(r||e.generate())+"."+m,p=(c.config.dirName?c.config.dirName+"/":"")+u,d=(l=c.config).s3Url&&""!==l.s3Url?l.s3Url:function(e){var t=e.bucketName,r=e.region,i=r.split("-")[0];switch(i){case"cn":return"https://"+t+".s3."+r+".amazonaws.com."+i;default:return"https://"+t+".s3-"+r+".amazonaws.com"}}(l);return s.append("key",p),s.append("acl","public-read"),s.append("Content-Type",t.type),s.append("x-amz-meta-uuid","14365123651274"),s.append("x-amz-server-side-encryption","AES256"),s.append("X-Amz-Credential",c.config.accessKeyId+"/"+n+"/"+c.config.region+"/s3/aws4_request"),s.append("X-Amz-Algorithm","AWS4-HMAC-SHA256"),s.append("X-Amz-Date",i),s.append("x-amz-meta-tag",""),s.append("Policy",o.getPolicy(c.config)),s.append("X-Amz-Signature",a.getSignature(c.config,n,o.getPolicy(c.config))),s.append("file",t),Promise.resolve(fetch(d,{method:"post",body:s})).then(function(e){return e.ok?Promise.resolve({bucket:c.config.bucketName,key:(c.config.dirName?c.config.dirName+"/":"")+u,location:d+"/"+(c.config.dirName?c.config.dirName+"/":"")+u,status:e.status}):Promise.reject(e)})}catch(e){return Promise.reject(e)}var l},c.prototype.deleteFile=function(e){try{return Promise.resolve(fetch("https://"+this.config.bucketName+".s3"+(this.config.region?"-"+this.config.region:"")+".amazonaws.com/"+(this.config.dirName?this.config.dirName+"/":"")+e,{method:"delete"})).then(function(t){return t.ok?Promise.resolve({ok:t.ok,status:t.status,message:"File Deleted",fileName:e}):Promise.reject(t)})}catch(e){return Promise.reject(e)}};export default c;
//# sourceMappingURL=aws-s3.m.js.map