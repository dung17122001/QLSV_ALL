package com.kltn.api.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@Service
public class AWSService {
    private AmazonS3 s3;

    @Value("${aws.s3url}")
    private String endpointURL;

    @Value("${aws.bucket}")
    private String bucketName;
    @Value("${aws.accessKey}")
    private String accessKey;

    @Value("${aws.secretKey}")
    private String secretKey;

    /** Khởi tạo tự động kết nối S3 **/
    @PostConstruct
    private void initAWS(){
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3 = new AmazonS3Client(credentials);
    }


    /**Chuyển đổi file dạng multipart sang file IO**/
    private File convertMultipartToFile(MultipartFile multipart) throws IOException {
        File newFile = new File(multipart.getOriginalFilename());
        FileOutputStream outStream = new FileOutputStream(newFile);
        outStream.write(multipart.getBytes());
        outStream.close();
        return newFile;
    }

    /**Tạo file name không trùng**/
    private String generateFileName(){
        String uuid = UUID.randomUUID().toString();
        return new Date().getTime() +"-"+uuid;
    }

    /**Tải file lên s3**/
    private void uploadFileToS3(String fileName, File newFile ){
        //PublicRead sẽ cho phép bất kì ai có đường dẫn sẽ truy cập được file
        s3.putObject(new PutObjectRequest(bucketName, fileName, newFile).withCannedAcl(CannedAccessControlList.PublicRead));

    }

    public String uploadFile(MultipartFile multipartFile){
        String fileUrl = "";
        try {
            File file = convertMultipartToFile(multipartFile);
            String fileName = generateFileName();
            fileUrl = endpointURL +"/" + fileName;
            uploadFileToS3(fileName, file);
            file.delete();
            return fileUrl;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "";

    }

    public boolean deleteFile(String fileName){
        try {
            s3.deleteObject(new DeleteObjectRequest(bucketName, fileName));
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


}
